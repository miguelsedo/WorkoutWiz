import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use(cors({
    origin: '*'
}));

// Conexion db MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'wwdb1'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Conexión GPT-3.5-turbo
async function interactWithGPT(prompt) {
    const OPENAI_API_KEY = ''; 

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error al interactuar con GPT-3.5-turbo:', error.response ? error.response.data : error.message);
        throw new Error('Error al interactuar con GPT-3.5-turbo');
    }
}

// Interactuar con GPT
app.post('/interact-with-gpt', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Se requiere prompt' });
    }

    try {
        const response = await interactWithGPT(prompt);
        res.json({ response });
    } catch (error) {
        console.error('Error al genera la respuesta:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Añadir datos a la db
app.post('/add-data', (req, res) => {
    const { tableName, data } = req.body;

    // Verificar si la tabla es correcta
    const validTables = ['persona', 'datos_gym', 'training_plan'];
    if (!validTables.includes(tableName)) {
        return res.status(400).send('Invalid table name');
    }

    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    const updates = keys.map(key => `${mysql.escapeId(key)} = VALUES(${mysql.escapeId(key)})`).join(', ');

    //INSERT INTO ... ON DUPLICATE KEY UPDATE query
    const query = `INSERT INTO ${mysql.escapeId(tableName)} (${keys.map(key => mysql.escapeId(key)).join(', ')}) 
                   VALUES (${placeholders}) 
                   ON DUPLICATE KEY UPDATE ${updates}`;

    // Ejecutar query + display errores
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error ejecutando query:', err);
            return res.status(500).send('Error al añadir datos');
        }
        res.status(200).send('Datos añadidos correctamente');
    });
});

app.get('/get-persona/:id', (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM persona WHERE ID = ?";

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching persona:', err);
            return res.status(500).send('Failed to fetch data');
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Persona not found');
        }
    });
});

app.get('/routines/:userId', (req, res) => {
    const userId = req.params.userId; // extraer user id de los parametros
    const query = `
        SELECT DISTINCT tp.id, tp.persona_id, tp.titulo, tp.dia, tp.resumen_dia
        FROM training_plan tp
        WHERE tp.persona_id = ?
        ORDER BY tp.titulo, tp.dia;
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Failed to fetch routines:", err);
            res.status(500).send('Error fetching routines');
            return;
        }
        // Reestructurar datos
        const routines = results.reduce((acc, curr) => {
            let routine = acc.find(r => r.titulo === curr.titulo);
            if (!routine) {
                routine = {
                    id: curr.id, // ID training_plan
                    titulo: curr.titulo,
                    days: []
                };
                acc.push(routine);
            }
            routine.days.push({
                dia: curr.dia,
                resumen_dia: curr.resumen_dia
            });
            return acc;
        }, []);
        res.json(routines);
    });
});

app.get('/routine-detail/:routineId/:userId', (req, res) => {
    const { routineId, userId } = req.params;

    const query = `
        SELECT tp.id, tp.titulo, tp.dia, tp.resumen_dia, tp.ejercicio, tp.details , tp.exercise_id
        FROM training_plan tp
        LEFT JOIN persona p ON tp.persona_id = p.ID
        WHERE tp.id = ? AND p.ID = ?
        ORDER BY tp.dia;
    `;

    db.query(query, [routineId, userId], (err, results) => {
        console.log('Executing query:', query);
        console.log('With parameters:', routineId, userId);

        if (err) {
            console.error("Failed to fetch routine details:", err);
            return res.status(500).send('Error fetching routine details');
        }

        if (results.length === 0) {
            return res.status(404).send('Routine not found or access denied');
        }

        console.log('Query results:', results);

        const routineDetails = {
            id: routineId,
            titulo: results[0].titulo,
            days: results.reduce((acc, curr) => {
                let day = acc.find(d => d.dia === curr.dia);
                if (!day) {
                    day = {
                        dia: curr.dia,
                        resumen_dia: curr.resumen_dia,
                        activities: []
                    };
                    acc.push(day);
                }
                day.activities.push({
                    ejercicio: curr.ejercicio,
                    details: curr.details,
                    exercise_id: curr.exercise_id
                });
                return acc;
            }, [])
        };

        res.json(routineDetails);
    });
});


// Endpoint to delete a training plan
app.delete('/delete-routine/:routineId/:userId', (req, res) => {
    const { routineId, userId } = req.params;

    // SQL query to delete the specified routine for the given user
    const query = `
        DELETE FROM training_plan
        WHERE persona_id = ? AND ID = ?;
    `;

    // Execute the query
    db.query(query, [userId, routineId], (err, result) => {
        if (err) {
            console.error("Failed to delete the routine:", err);
            return res.status(500).send('Error deleting the routine');
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no routine was found or user did not match
            return res.status(404).send('Routine not found or access denied');
        }

        // Successfully deleted the routine
        res.status(200).send('Routine deleted successfully');
    });
});

// Save training plan to database
app.post('/save-training-plan', (req, res) => {
    const { userId, trainingPlan, goal } = req.body;

    if (!userId || !trainingPlan || !goal) {
        return res.status(400).json({ error: 'UserId, training plan, and goal are required' });
    }

    // Calcula el día máximo del plan (para mostrar en la CustomCard) "Entreno de x días"
    const maxDias = Math.max(...trainingPlan.map(day => day.day));
    const modifiedGoal = `${goal} - ${maxDias} días`;

    // Ver si existge un training plan con el mismo objetivo y días para el usuario, y en ese caso lo sobreescribe
    const checkExistQuery = `SELECT ID FROM training_plan WHERE persona_id = ? AND titulo = ? LIMIT 1`;

    db.query(checkExistQuery, [userId, modifiedGoal], (err, result) => {
        if (err) {
            console.error('Error checking existing training plan:', err);
            return res.status(500).json({ error: 'Failed to check existing training plan' });
        }

        let newTrainingPlanId;
        if (result.length > 0) {
            // Si existe, eliminar
            newTrainingPlanId = result[0].ID;
            const deleteQuery = `DELETE FROM training_plan WHERE persona_id = ? AND ID = ?`;

            db.query(deleteQuery, [userId, newTrainingPlanId], (err, deleteResult) => {
                if (err) {
                    console.error('Error deleting existing training plan:', err);
                    return res.status(500).json({ error: 'Failed to delete existing training plan' });
                }
                insertNewTrainingPlan(newTrainingPlanId);
            });
        } else {
            // training_plan ID
            const getNextIdQuery = 'SELECT IFNULL(MAX(ID), 0) + 1 AS newId FROM training_plan';

            db.query(getNextIdQuery, (err, result) => {
                if (err) {
                    console.error('Error fetching new training plan ID:', err);
                    return res.status(500).json({ error: 'Failed to fetch new training plan ID' });
                }

                newTrainingPlanId = result[0].newId;
                insertNewTrainingPlan(newTrainingPlanId);
            });
        }

        function insertNewTrainingPlan(trainingPlanId) {
            const query = `INSERT INTO training_plan (ID, persona_id, dia, titulo, resumen_dia, ejercicio, details) VALUES ?`;

            const values = trainingPlan.reduce((acc, day, index) => {
                day.exercises.forEach(exercise => {
                    acc.push([
                        trainingPlanId, // ID de los ejercicios del plan
                        userId,
                        day.day,  
                        modifiedGoal,  // Nuevo título con el goal + el día maximo
                        day.title,  // Resumen del dia
                        exercise.exercise,  
                        exercise.details    
                    ]);
                });
                return acc;
            }, []);

            console.log('Inserting values:', values);  // Log the values being inserted

            db.query(query, [values], (err, result) => {
                if (err) {
                    console.error('Error inserting training plan:', err);
                    return res.status(500).json({ error: 'Failed to save training plan', details: err });
                }
                res.status(200).json({ message: 'Training plan saved successfully' });
            });
        }
    });
});

// Endpoint para actualizar datos de una ID de ejercicio
app.put('/update-exercise/:personaId/:exerciseId', (req, res) => {
    const { personaId, exerciseId } = req.params;
    const { ejercicio, details } = req.body;

    if (!ejercicio || !details) {
        return res.status(400).json({ error: 'Ejercicio and details are required' });
    }

    const query = `
        UPDATE training_plan
        SET ejercicio = ?, details = ?
        WHERE persona_id = ? AND exercise_id = ?
    `;

    db.query(query, [ejercicio, details, personaId, exerciseId], (err, result) => {
        if (err) {
            console.error('Error updating exercise:', err);
            return res.status(500).json({ error: 'Failed to update exercise' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Exercise not found or access denied' });
        }

        res.status(200).json({ message: 'Exercise updated successfully' });
    });
});

