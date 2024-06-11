import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';
import './styles.css';
import { UserProvider } from './hooks';

export const WorkoutWizApp = () => {
  return (
    <AppTheme>
      <UserProvider>
        <AppRouter/>
      </UserProvider>
    </AppTheme>
  )
}

