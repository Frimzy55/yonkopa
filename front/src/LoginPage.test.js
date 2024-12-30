// LoginPage.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock axios to avoid actual network requests
jest.mock('axios');

// Mock localStorage
beforeEach(() => {
  localStorage.clear();
});

describe('LoginPage', () => {
  test('renders login page', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('shows error when username is missing', async () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    });
  });

  test('shows error when password is missing or too short', async () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'testUser' },
    });
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: '123' },
    });
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
    });
  });

  test('submits valid credentials and redirects', async () => {
    axios.post.mockResolvedValue({ status: 200 });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'testUser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'validPassword123' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(localStorage.getItem('username')).toBe('testUser');
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/login', {
        username: 'testUser',
        password: 'validPassword123',
      });
    });
  });

  test('shows error message for invalid credentials', async () => {
    axios.post.mockRejectedValue({
      response: { status: 401 },
    });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'wrongUser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'wrongPassword' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
    });
  });

  test('shows christmas tree during the last week of December', () => {
    const date = new Date('2024-12-25');
    global.Date = jest.fn(() => date);

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(screen.getByAltText('Christmas Tree')).toBeInTheDocument();
  });

  test('toggle password visibility', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const toggleButton = screen.getByRole('button');

    // Initially, the password is hidden
    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);

    // After clicking the toggle button, the password is visible
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleButton);

    // After clicking again, the password is hidden
    expect(passwordInput.type).toBe('password');
  });
});
