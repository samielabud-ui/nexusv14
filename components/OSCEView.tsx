
import React, { useState } from 'react';

interface OSCEViewProps {
  isPremium: boolean;
  onNavigateToPremium: () => void;
}

const OSCEView: React.FC<OSCEViewProps> = ({ isPremium, onNavigateToPremium }) => {
  const [selectedMed, setSelectedMed] = useState<number | null>(null);

  const osceMeds = [
    { num: 2, description: "Semiologia Básica e Anamnese Estruturada", color: "border-blue-500" },
    { num: 4, description: "Raciocínio Clínico e Semiologia Avançada", color: "border-purple-500" },
    { num: 8, description: "Condutas de Urgência, Emergência e Manejo Crítico", color: "border-red-500" }
  ];

  if (!isPremium) {
    return (
      <div className="max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 px-4 pt-10">
        <div className="bg-neutral-900/40 border border-blue-600/20 p-12 md:p-24 rounded-[3rem] text-center border-dashed backdrop-blur-sm">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-8 shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">Estações OSCE Premium</h2>
          <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Acesse checklists oficiais, cronômetros de estação e casos clínicos estruturados para o exame prático. 
            Este recurso é exclusivo para membros <span className="text-blue-500 font-bold italic">Nexus Premium</span>.
          </p>
          <button 
            onClick={onNavigateToPremium}
            className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-5 rounded-2xl text-xs md:text-sm uppercase tracking-[0.3em] shadow-2xl shadow-blue-600/20 transition-all active:scale-95"
          >
            Fazer Upgrade Agora
          </button>
        </div>
      </div>
    );
  }

  if (selectedMed) {
    return (
      <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500 px-4">
        <button 
          onClick={() => setSelectedMed(null)} 
          className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-medium uppercase tracking-widest">Voltar para Seleção</span>
        </button>

        <header className="mb-12">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-2 block">Preparatório Prático</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">OSCE Med {selectedMed}</h2>
        </header>

        <div className="bg-neutral-900/30 border border-neutral-800 p-12 md:p-20 rounded-[2.5rem] md:rounded-[4rem] text-center border-dashed">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-600 mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M3 10h18"/><path d="M10 3v18"/></svg>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight">Estações em Desenvolvimento</h3>
          <p className="text-neutral-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Estamos formatando os checklists e casos de simulação realística para o currículo de <span className="text-white font-bold">Med {selectedMed}</span>.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
             <div className="px-5 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-[9px] md:text-[10px] font-black uppercase text-neutral-600 tracking-widest">Checklists</div>
             <div className="px-5 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-[9px] md:text-[10px] font-black uppercase text-neutral-600 tracking-widest">Casos Clínicos</div>
             <div className="px-5 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-[9px] md:text-[10px] font-black uppercase text-neutral-600 tracking-widest">Cronômetros</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500 px-4">
      <header className="mb-12 md:mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter italic">OSCE</h2>
        <p className="text-neutral-400 text-lg md:text-2xl font-light max-w-3xl leading-relaxed">
          O exame prático estruturado exige organização e precisão. Treine com checklists oficiais e simulações realísticas.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {osceMeds.map((med) => (
          <div 
            key={med.num}
            onClick={() => setSelectedMed(med.num)}
            className={`bg-neutral-900/40 border-2 ${med.color} p-10 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] cursor-pointer hover:bg-neutral-900 hover:scale-[1.03] transition-all group flex flex-col justify-between h-[350px] md:h-[450px] shadow-2xl overflow-hidden relative`}
          >
            {/* Background Decorative Element */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-5 blur-3xl group-hover:opacity-10 transition-opacity ${med.color.replace('border', 'bg')}`}></div>
            
            <div className="relative z-10">
              <span className="text-[10px] md:text-[12px] font-black text-neutral-500 uppercase tracking-[0.4em] mb-4 block">Ciclo de Estudo</span>
              <h3 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter italic">Med {med.num}</h3>
              <p className="text-neutral-400 text-sm md:text-lg font-medium leading-tight max-w-[200px]">
                {med.description}
              </p>
            </div>
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] md:text-[12px] font-bold text-white uppercase tracking-widest group-hover:translate-x-2 transition-transform">Ver Estações →</span>
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OSCEView;
