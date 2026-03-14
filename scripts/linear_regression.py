"""
Linear Regression from scratch using NumPy.
Demonstrates gradient descent to fit a line to data.
"""

import numpy as np
import matplotlib.pyplot as plt


def generate_data(n=100, noise=10, seed=42):
    np.random.seed(seed)
    X = np.linspace(0, 100, n)
    y = 2.5 * X + 15 + np.random.randn(n) * noise
    return X, y


def mean_squared_error(y_true, y_pred):
    return np.mean((y_true - y_pred) ** 2)


def gradient_descent(X, y, lr=0.0001, epochs=1000):
    m, b = 0.0, 0.0
    n = len(X)
    losses = []

    for _ in range(epochs):
        y_pred = m * X + b
        loss = mean_squared_error(y, y_pred)
        losses.append(loss)

        dm = (-2 / n) * np.sum(X * (y - y_pred))
        db = (-2 / n) * np.sum(y - y_pred)

        m -= lr * dm
        b -= lr * db

    return m, b, losses


if __name__ == "__main__":
    X, y = generate_data()
    m, b, losses = gradient_descent(X, y)

    print(f"Learned slope (m): {m:.4f}")
    print(f"Learned intercept (b): {b:.4f}")
    print(f"Final MSE: {losses[-1]:.4f}")

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

    ax1.scatter(X, y, alpha=0.5, label="Data")
    ax1.plot(X, m * X + b, color="red", label=f"y = {m:.2f}x + {b:.2f}")
    ax1.set_title("Linear Regression Fit")
    ax1.set_xlabel("X")
    ax1.set_ylabel("y")
    ax1.legend()

    ax2.plot(losses)
    ax2.set_title("Training Loss")
    ax2.set_xlabel("Epoch")
    ax2.set_ylabel("MSE")

    plt.tight_layout()
    plt.savefig("linear_regression_result.png")
    print("Plot saved to linear_regression_result.png")
