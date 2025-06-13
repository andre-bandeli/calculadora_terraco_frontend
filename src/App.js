import React, { useState } from 'react';
import CalculatorForm from './components/CalculatorForm';
import ResultDisplay from './components/ResultDisplay';
import { calculateTerraces } from './calculations';
import './style.css';
import terraco from './terraco.jpg'

import unicamp_logo from './unicamp.png'
import feagri_logo from './feagri.png'

function App() {
  const [results, setResults] = useState(null);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleCalculate = async (formData) => {
    try {
      const calculatedResults = await calculateTerraces(formData);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Erro no cálculo:', error);
      alert('Erro ao realizar o cálculo. Verifique os dados e tente novamente.');
    }
  };

  const handleReportGenerated = () => {
    setReportGenerated(true);
    setTimeout(() => setReportGenerated(false), 3000);
  };

  return (
    <div className='main'>
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 ml-4" />
          </div>
          <div className='logos'>
            <img src={unicamp_logo}></img>
             <img src={feagri_logo}></img>
          </div>
          <h1 className="text-3xl font-bold text-green-800">
            UNIVERSIDADE ESTADUAL DE CAMPINAS
          </h1>
          <h2 className="text-3xl font-bold text-green-800">
            Faculdade de Engenharia Agrícola (FEAGRI/UNICAMP)
          </h2>
          <p className="text-gray-600 mt-2">
            Laboratório de Solos
          </p>
        </header>
        
        <div className='descricao'>
            <h2>Calculadora de Terraços</h2>
            <p>A Calculadora de Terraços é uma aplicação interativa desenvolvida para auxiliar técnicos, engenheiros e produtores rurais no dimensionamento adequado do espaçamento entre terraços agrícolas. A partir de parâmetros como declividade do terreno, tipo de solo, uso da terra e preparo do solo, o sistema utiliza fórmulas técnicas reconhecidas para calcular automaticamente o espaçamento ideal entre os terraços.</p>
        </div>
        <div className='terraco-img'>
          <img src={terraco}></img>
        </div>
        <div className='forms'>
        

        <CalculatorForm onCalculate={handleCalculate} />


        </div>

        {results && <ResultDisplay results={results} onGenerateReport={handleReportGenerated} />}

        {reportGenerated && (
          <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Relatório gerado com sucesso!
          </div>
        )}

        <div className='block'>
          <h2>Referências</h2>
          <p>
            NOGUEIRA JUNIOR, L. R., de AMORIM, J. R. A., & DOMPIERI, M. (2016). Terraceamento:
conservação do solo e da água no polo de produção de milho, em Sergipe.
          </p>
          <p>
            Bertoni, J., & LOMBARDI NETO, F. (1990). Conservação do solo. ícone. São Paulo, 335.
          </p>
        </div>
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>Laboratório de Solos da FEAGRI - UNICAMP</p>
          <p> <strong>Autores:</strong> André Luiz Bandeli Júnior; Prof. Dr. Renato Paiva de Lima <br></br> {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
    </div>
  );
}

export default App;