    // script.js
    function calculateCredit() {
      // Получаване на стойностите от входните полета
      var markup = parseFloat(document.getElementById('markup').value);
      var turnover1 = parseFloat(document.getElementById('turnover1').value);
      var turnover2 = parseFloat(document.getElementById('turnover2').value);
      var turnover3 = parseFloat(document.getElementById('turnover3').value);
      var dailyTurnover = parseFloat(document.getElementById('dailyTurnover').value);
      var monthlyExpenses = parseFloat(document.getElementById('monthlyExpenses').value);
      var creditExpenses = parseFloat(document.getElementById('creditExpenses').value);

      // Изчисления
      var averageMonthlyTurnover = (turnover1 + turnover2 + turnover3) / 3;
      var potentialTurnover = averageMonthlyTurnover * 2.5;
      var minTurnover = dailyTurnover * 26;
      var algorithmTurnover = Math.min(Math.max(minTurnover, averageMonthlyTurnover), potentialTurnover);
      var margin = markup / (100 + markup);
      var monthlyGoods = algorithmTurnover * (1 - margin);
      var revenue = algorithmTurnover * margin;
      var profit = revenue - monthlyExpenses - creditExpenses;
      var maxCreditLimit;

      // Определяне на максималния лимит на кредитния лимит
      if (margin > 50) {
        maxCreditLimit = algorithmTurnover;
      } else if (margin > 30) {
        maxCreditLimit = algorithmTurnover * 0.5;
      } else {
        maxCreditLimit = algorithmTurnover * 0.25;
      }

      // Лимитът се определя в интервал от 500 лв.
      maxCreditLimit = Math.floor(maxCreditLimit / 500) * 500;

      // Показване на изходните данни
      var output = document.getElementById('output');
      output.innerHTML = `
        <p>Средномесечен доказан оборот: ${averageMonthlyTurnover.toFixed(2)} лв.</p>
        <p>Потенциален оборот: ${potentialTurnover.toFixed(2)} лв.</p>
        <p>Минимален оборот: ${minTurnover.toFixed(2)} лв.</p>
        <p>Оборот за алгоритъм: ${algorithmTurnover.toFixed(2)} лв.</p>
        <p>Марж: ${(margin * 100).toFixed(2)}%</p>
        <p>Месечно стока: ${monthlyGoods.toFixed(2)} лв.</p>
        <p>Приход: ${revenue.toFixed(2)} лв.</p>
        <p>Печалба: ${profit.toFixed(2)} лв.</p>
        <p>Максимален лимит на кредитен лимит: ${maxCreditLimit.toFixed(2)} лв.</p>
      `;
    }

    function exportToPDF() {
      var doc = new jsPDF();
      var outputText = document.getElementById('output').innerText;
      doc.text(outputText, 10, 10);
      doc.save('credit_limit_calculation.pdf');
    }
