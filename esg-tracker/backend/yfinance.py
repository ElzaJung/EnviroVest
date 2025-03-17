from flask import Flask, jsonify, request
import yfinance as yf

app = Flask(__name__)

@app.route('/api/v1/stocks', methods=['GET'])
def get_stock_data():
    company_name = request.args.get('name', None)
    if not company_name:
        return jsonify({'error': 'Company name is required'}), 400

    # Get the ticker symbol for the company name
    ticker_data = yf.Tickers(' '.join(company_name.split()))
    tickers = ticker_data.tickers.keys()

    if not tickers:
        return jsonify({'error': 'No ticker found for this company name'}), 404

    ticker = tickers[0]  # Use the first ticker found (you can refine this logic)

    stock = yf.Ticker(ticker)
    hist = stock.history(period="1mo")  # Get data for the last month
    return jsonify(hist.reset_index().to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)