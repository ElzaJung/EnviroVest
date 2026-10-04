# EnviroVest

EnviroVest is a platform that helps Canadians make smarter and more sustainable investment decisions by providing **real-time ESG risk ratings for Canadian companies**.

## EnviroVest Pipeline

EnviroVest processes publicly available corporate information through four main stages:

1. **Data Preparation**
2. **NLP Analysis**
3. **ESG Scoring**
4. **Data Storage**

---

### 1. Data Preparation

<img width="703" height="401" alt="image" src="https://github.com/user-attachments/assets/d2fc6a9e-46e4-420b-a513-d1aa9af3f285" />

The data preparation stage collects publicly available corporate information from reliable sources.

- Uses web scraping techniques with **Requests** and **BeautifulSoup**
- Iterates through multiple search queries and search engines to locate relevant corporate documents
- Searches for:
  - Annual reports
  - Management's Discussion & Analysis (MD&A)
  - Financial and other credible corporate resources
- Extracts text from PDF documents using **PyMuPDF**
- Prepares the collected text for downstream NLP analysis

The primary goal of this stage is to collect and convert relevant corporate documents into machine-readable text.

---

### 2. NLP Analysis

<img width="710" height="394" alt="image" src="https://github.com/user-attachments/assets/3c48562d-631b-4c24-b311-599a4a263548" />

The extracted corporate text is analyzed using an LLM to identify ESG-related information.

The model extracts both **quantitative metrics** and **qualitative statements** related to:

- **Environmental:** Carbon emissions, energy use, waste management, and other environmental indicators
- **Social:** Labor practices, diversity & inclusion, employee-related policies, and other social indicators
- **Governance:** Board structure, executive compensation, corporate policies, and other governance indicators

A shortened version of the extraction prompt is shown below:

```python
def extract_esg_metrics_from_chunk(self, text_chunk):
    prompt = f"""
You are an expert ESG analyst with exceptional ability to extract key ESG performance metrics from corporate reports.
Analyze the following text and extract all available explicit data—including both quantitative figures and qualitative statements—for ESG scoring.

**Environmental:** - Carbon Emissions, Energy Use, Waste Management, etc.

**Social:** - Labor Practices, Diversity & Inclusion, etc.

**Governance:** - Board Structure, Executive Compensation, etc.

Text to analyze:
{text_chunk}
Return your answer in JSON format.
"""
    response = gemini_chat_completion(
        prompt,
        max_tokens=2000,
        temperature=0.2
    )

    json_match = re.search(
        r"```json\s*(\{.*?\})\s*```",
        response["choices"][0]["message"]["content"],
        re.DOTALL
    )

    if json_match:
        return json.loads(json_match.group(1))

    return json.loads(response["choices"][0]["message"]["content"])
```
### 3. ESG Scoring
<img width="1370" height="776" alt="image" src="https://github.com/user-attachments/assets/1dc027f4-f3f3-4fe5-a93c-cc20412e949a" />

#### Scoring Criteria
<img width="744" height="312" alt="image" src="https://github.com/user-attachments/assets/9d59295d-9611-42c3-b3ff-9cb60947ee34" />

Each ESG criterion is evaluated as TRUE or FALSE based on the available company data.

The resulting evaluations are used to calculate the company's ESG risk rating.

### 4. Data Storage
<img width="655" height="266" alt="image" src="https://github.com/user-attachments/assets/43711ca4-21f0-4836-84f7-a8148f4086a1" />

The processed ESG metrics and scoring results are stored in Supabase.

## Setup
1. Install dependencies: `pip install -r requirements.txt`
2. Copy `.env` file from discord server to root directory
3. Run `python data/push-data.py` to push data to database
