from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


def calculate(num1, num2, operator):
    """Perform the requested arithmetic operation and return the result."""
    if operator == "+":
        return num1 + num2
    elif operator == "-":
        return num1 - num2
    elif operator == "*":
        return num1 * num2
    elif operator == "/":
        if num2 == 0:
            raise ZeroDivisionError("Cannot divide by zero")
        return num1 / num2
    else:
        raise ValueError(f"Unknown operator: {operator}")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/calculate", methods=["POST"])
def calculate_route():
    data = request.get_json()

    try:
        num1 = float(data.get("num1"))
        num2 = float(data.get("num2"))
        operator = data.get("operator")
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid numbers supplied"}), 400

    try:
        result = calculate(num1, num2, operator)
    except ZeroDivisionError as e:
        return jsonify({"error": str(e)}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    # Return integers without a trailing .0 when possible
    if result == int(result):
        result = int(result)

    return jsonify({"result": result})


if __name__ == "__main__":
    app.run(debug=True)
