    const readline = require("readline");
    const axios = require("axios");

    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    });

    const supportedCurrencies = [
    "USD", "ZAR", "TRY" // ✅ EGP (Egyptian Pound) đúng
    ];

    console.log("💱 Currency Converter CLI (dùng readline + axios)");

    const askQuestion = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
    };

    const convertCurrency = async () => {
    try {
        const from = (await askQuestion(`Convert From (${supportedCurrencies.join(", ")}): `)).toUpperCase();
        const to = (await askQuestion(`Convert To (${supportedCurrencies.join(", ")}): `)).toUpperCase();
        const amountStr = await askQuestion("Amount to convert: ");
        const amount = parseFloat(amountStr);

        if (
        isNaN(amount) ||
        !supportedCurrencies.includes(from) ||
        !supportedCurrencies.includes(to)
        ) {
        console.log("❌ Dữ liệu không hợp lệ. Hãy thử lại.");
        rl.close();
        return;
        }

        const res = await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
        const converted = res.data.rates[to];

        console.log(`✅ ${amount} ${from} = ${converted} ${to}`);
    } catch (err) {
        console.error("⚠️ Error: Không thể lấy dữ liệu từ API hoặc loại tiền không hợp lệ.");
    } finally {
        rl.close();
    }
    };

    convertCurrency();
