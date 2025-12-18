
import React, { useState, useEffect } from 'react';
import { getWeatherInfo } from '../services/geminiService';

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState('New York');
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    const data = await getWeatherInfo(city);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-indigo-900/40 p-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <input 
            className="bg-transparent border-b border-white/20 text-white text-xl text-center focus:outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onBlur={fetchWeather}
          />
          <i className="fa-solid fa-location-dot text-white/40"></i>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-20 w-20 bg-white/10 rounded-full mx-auto"></div>
            <div className="h-10 w-32 bg-white/10 rounded-md mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="text-6xl font-bold mb-2">{weather?.temperature || '--'}°</div>
            <div className="text-xl text-white/60 mb-8 capitalize">{weather?.condition || 'Unknown'}</div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white/5 rounded-2xl">
                <div className="text-[10px] uppercase text-white/40 mb-1">Humidity</div>
                <div className="text-lg font-medium">65%</div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl">
                <div className="text-[10px] uppercase text-white/40 mb-1">Wind</div>
                <div className="text-lg font-medium">12 km/h</div>
              </div>
            </div>

            <p className="text-sm text-white/70 italic">"{weather?.recommendation}"</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
