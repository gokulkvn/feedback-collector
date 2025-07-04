# TODO: Add route for submitting feedback
# TODO: Connect to SQLite and create feedback table
# TODO: Add sentiment analysis for feedback messages
# TODO: Add route to get all feedback and stats
# TODO: Add delete route for admin


from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import string

app = Flask(__name__)
CORS(app)

# --- Initialize Database ---
def init_db():
    conn = sqlite3.connect('feedback.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            category TEXT,
            message TEXT,
            sentiment TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# --- senti analysis ---
def analyze_sentiment(message):
    positive_keywords = ['good', 'great', 'awesome', 'excellent', 'love', 'loved', 'like', 'nice', 'fantastic', 'amazing', 'happy']
    negative_keywords = ['bad', 'terrible', 'hate', 'worst', 'bug', 'issue', 'problem', 'disappointed', 'slow', 'worst']

    message = message.lower()
    message = message.translate(str.maketrans('', '', string.punctuation))


    if any(word in message for word in negative_keywords):
        return 'negative'
    elif any(word in message for word in positive_keywords):
        return 'positive'
    else:
        return 'neutral'


# --- Routes ---
@app.route('/')
def home():
    return "Feedback Collector API is running!"

@app.route('/submit', methods=['POST'])
def submit_feedback():
    data = request.get_json()
    name = data.get('name')
    category = data.get('category')
    message = data.get('message')
    sentiment = analyze_sentiment(message)


    conn = sqlite3.connect('feedback.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO feedback (name, category, message, sentiment) VALUES (?, ?, ?, ?)',(name, category, message, sentiment))
    conn.commit()
    conn.close()

    return jsonify({"message": "Feedback submitted successfully!"}), 201

@app.route('/feedbacks', methods=['GET'])
def get_feedbacks():
    conn = sqlite3.connect('feedback.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM feedback')
    rows = cursor.fetchall()
    conn.close()

    feedback_list = []
    for row in rows:
        feedback_list.append({
            "id": row[0],
            "name": row[1],
            "category": row[2],
            "message": row[3],
            "sentiment": row[4]
        })

    return jsonify(feedback_list)

@app.route('/delete/<int:feedback_id>', methods=['DELETE'])
def delete_feedback(feedback_id):
    conn = sqlite3.connect('feedback.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM feedback WHERE id = ?', (feedback_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Feedback deleted"}), 200


@app.route('/stats', methods=['GET'])
def get_stats():
    conn = sqlite3.connect('feedback.db')
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM feedback')
    total = cursor.fetchone()[0]

    cursor.execute('SELECT category, COUNT(*) FROM feedback GROUP BY category')
    by_category = cursor.fetchall()
    conn.close()

    stats = {
        "total_feedback": total,
        "by_category": {category: count for category, count in by_category}
    }

    return jsonify(stats)

# --- Run the Server ---
if __name__ == '__main__':
    app.run(debug=True)
