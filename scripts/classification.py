"""
Binary classification using scikit-learn.
Compares Logistic Regression and Decision Tree on the breast cancer dataset.
"""

from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report


def load_and_split(test_size=0.2, seed=42):
    data = load_breast_cancer()
    X, y = data.data, data.target
    return train_test_split(X, y, test_size=test_size, random_state=seed), data.target_names


def evaluate(name, model, X_test, y_test):
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"\n{name}")
    print(f"  Accuracy: {acc:.4f}")
    print(classification_report(y_test, y_pred, target_names=["malignant", "benign"]))


if __name__ == "__main__":
    (X_train, X_test, y_train, y_test), target_names = load_and_split()

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    lr = LogisticRegression(max_iter=1000)
    lr.fit(X_train_scaled, y_train)
    evaluate("Logistic Regression", lr, X_test_scaled, y_test)

    dt = DecisionTreeClassifier(max_depth=5, random_state=42)
    dt.fit(X_train, y_train)
    evaluate("Decision Tree", dt, X_test, y_test)
