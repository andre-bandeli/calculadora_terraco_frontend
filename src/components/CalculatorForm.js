import React, { useState, useEffect } from 'react';
import { getCalculationOptions } from '../services/api';
import '../style.css'

const CalculatorForm = ({ onCalculate }) => {
  const [options, setOptions] = useState({
    soilTypes: [],
    landUses: [],
    soilPreparations: []
  });
  
  const [formData, setFormData] = useState({
    declividade: '',
    soilTypeId: '',
    landUseId: '',
    soilPreparationId: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getCalculationOptions();
        setOptions(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar opções:', error);
      }
    };
    
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.declividade || parseFloat(formData.declividade) <= 0) {
      newErrors.declividade = 'Declividade deve ser maior que zero';
    }
    
    if (!formData.soilTypeId) {
      newErrors.soilTypeId = 'Selecione um tipo de solo';
    }
    
    if (!formData.landUseId) {
      newErrors.landUseId = 'Selecione o uso da terra';
    }
    
    if (!formData.soilPreparationId) {
      newErrors.soilPreparationId = 'Selecione o preparo do solo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
    onCalculate({
      declividade: parseFloat(formData.declividade),
      soil_type_id: formData.soilTypeId,
      land_use_id: formData.landUseId,
      soil_preparation_id: formData.soilPreparationId
    });
    }
  };

  if (loading) return <div className="text-center">Carregando opções...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-green-800">Parâmetros de Cálculo</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Declividade do Terreno (%):
          </label>
          <input
            type="number"
            name="declividade"
            value={formData.declividade}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.declividade ? 'border-red-500' : 'border-gray-300'}`}
            step="0.1"
            min="0.1"
          />
          {errors.declividade && (
            <p className="text-red-500 text-sm mt-1">{errors.declividade}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Tipo de Solo (Kt):
          </label>
          <select
            name="soilTypeId"
            value={formData.soilTypeId}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.soilTypeId ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Selecione o tipo de solo</option>
            {options.soil_types.map((soil) => (
              <option key={soil.id} value={soil.id}>
                {soil.name} (Kt={soil.kt_value})
              </option>
            ))}
          </select>
          {errors.soilTypeId && (
            <p className="text-red-500 text-sm mt-1">{errors.soilTypeId}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Uso da Terra (U):
          </label>
          <select
            name="landUseId"
            value={formData.landUseId}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.landUseId ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Selecione o uso da terra</option>
            {options.land_uses.map((use) => (
              <option key={use.id} value={use.id}>
                {use.description} (U={use.u_value})
              </option>
            ))}
          </select>
          {errors.landUseId && (
            <p className="text-red-500 text-sm mt-1">{errors.landUseId}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Preparo do Solo (M):
          </label>
          <select
            name="soilPreparationId"
            value={formData.soilPreparationId}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.soilPreparationId ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Selecione o preparo do solo</option>
            {options.soil_preparations.map((prep) => (
              <option key={prep.id} value={prep.id}>
                {prep.description} (M={prep.m_value})
              </option>
            ))}
          </select>
          {errors.soilPreparationId && (
            <p className="text-red-500 text-sm mt-1">{errors.soilPreparationId}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition duration-200"
        >
          Calcular Espaçamento
        </button>
      </form>
    </div>
  );
};

export default CalculatorForm;