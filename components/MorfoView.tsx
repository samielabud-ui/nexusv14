
import React, { useState } from 'react';
import { UserStats } from '../types';

interface Lesson {
  title: string;
  url: string;
}

interface MorfoViewProps {
  userStats?: UserStats;
  onNavigateToPremium?: () => void;
  onIncrementUsage?: () => void;
}

const HISTOLOGIA_MED1_M1: Lesson[] = [
  { 
    title: "Microscopia", 
    url: "https://drive.google.com/file/d/1nVXbyb0o-QHPTmvxMiqekYyqN0sNkisL/preview" 
  },
  { 
    title: "Tecido Epitelial – Parte 1", 
    url: "https://drive.google.com/file/d/1E28iREzZdPdHbTMIbb94B0_SzNIJFiYe/preview" 
  },
  { 
    title: "Tecido Epitelial – Parte 2", 
    url: "https://drive.google.com/file/d/1Q0CrOd2vzngCgyUq1DsWkCG8IlxvvdcE/preview" 
  },
  { 
    title: "Tecido Conjuntivo", 
    url: "https://drive.google.com/file/d/1ohwE0qb0HEjYDGHR3lsa7cJ1PLmXW7qc/preview" 
  }
];

const ANATOMIA_MED1_M1: Lesson[] = [
  {
    title: "Planos e Terminologias Anatômicas",
    url: "https://drive.google.com/file/d/1tpciAGHGcvYE6M0i8IupSp7SKMVT7J-j/preview"
  },
  {
    title: "Pele e Tecido Adiposo",
    url: "https://drive.google.com/file/d/1LKrpLvO4mOhu7ocEtk6PcXxqSj4tEBD3/preview"
  },
  {
    title: "Parede Abdominal",
    url: "https://drive.google.com/file/d/1Wz5mMbURVOqBkvYyCpNl9Yc3bN4RKFF5/preview"
  }
];

const MorfoView: React.FC<MorfoViewProps> = ({ userStats, onNavigateToPremium, onIncrementUsage }) => {
  const [selectedMed, setSelectedMed] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'Anatomia' | 'Histologia' | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [activePdf, setActivePdf] = useState<Lesson | null>(null);

  const meds = Array.from({ length: 8 }, (_, i) => i + 1);
  const isOverLimit = userStats?.plan === 'basic' && (userStats?.dailyUsage || 0) >= 10;

  const handleOpenPdf = (lesson: Lesson) => {
    if (isOverLimit) return;
    setActivePdf(lesson);
    onIncrementUsage?.();
  };

  const getModulesForMed = (med: number) => {
    const start = (med - 1) * 3 + 1;
    return [start, start + 1, start + 2];
  };

  const resetToMeds = () => {
    setSelectedMed(null);
    setSelectedCategory(null);
    setSelectedModule(null);
    setActivePdf(null);
  };

  const resetToCategories = () => {
    setSelectedCategory(null);
    setSelectedModule(null);
    setActivePdf(null);
  };

  const resetToModules = () => {
    setSelectedModule(null);
    setActivePdf(null);
  };

  const closePdf = () => {
    setActivePdf(null);
  };

  if (selectedMed === null) {
    return (
      <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500 px-4">
        <header className="mb-10 md:mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter italic">Morfo</h2>
          <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Área dedicada ao estudo morfofuncional. Selecione seu período para começar.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {meds.map((m) => (
            <div 
              key={m} 
              onClick={() => setSelectedMed(m)}
              className="bg-neutral-900/30 border border-neutral-800 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] cursor-pointer hover:bg-neutral-900 hover:border-blue-600/50 hover:scale-[1.02] transition-all group flex flex-col justify-between h-48 md:h-64 shadow-xl"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] md:text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Período</span>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
              </div>
              <div>
                <h4 className="text-3xl md:text-4xl font-black text-white tracking-tight">Med {m}</h4>
                <p className="text-neutral-500 text-[10px] mt-2 uppercase tracking-widest font-bold group-hover:text-neutral-300 transition-colors italic">Ver Módulos →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedCategory === null) {
    return (
      <div className="max-w-[1200px] mx-auto animate-in slide-in-from-right-4 duration-500 px-4">
        <button onClick={resetToMeds} className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-medium uppercase tracking-widest">Escolher outro Med</span>
        </button>

        <header className="mb-10 md:mb-12">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-2 block">Med {selectedMed}</span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">O que você vai estudar hoje?</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div 
            onClick={() => setSelectedCategory('Anatomia')}
            className="bg-neutral-900/40 border border-neutral-800 p-10 md:p-12 rounded-[2rem] md:rounded-[3rem] cursor-pointer hover:bg-neutral-900 hover:border-indigo-500 transition-all group h-[300px] md:h-[400px] flex flex-col justify-center items-center text-center shadow-xl"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500 mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/></svg>
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-4 tracking-tight">Anatomia</h3>
            <p className="text-neutral-500 text-[10px] md:text-sm max-w-[200px] md:max-w-xs leading-relaxed">Atlas integrados, resumos e questões.</p>
          </div>

          <div 
            onClick={() => setSelectedCategory('Histologia')}
            className="bg-neutral-900/40 border border-neutral-800 p-10 md:p-12 rounded-[2rem] md:rounded-[3rem] cursor-pointer hover:bg-neutral-900 hover:border-emerald-500 transition-all group h-[300px] md:h-[400px] flex flex-col justify-center items-center text-center shadow-xl"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/></svg>
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-4 tracking-tight">Histologia</h3>
            <p className="text-neutral-500 text-[10px] md:text-sm max-w-[200px] md:max-w-xs leading-relaxed">Lâminas digitais e tecidos integrados.</p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedModule === null) {
    const modules = getModulesForMed(selectedMed);
    return (
      <div className="max-w-[1200px] mx-auto animate-in slide-in-from-right-4 duration-500 px-4">
        <button onClick={resetToCategories} className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-medium uppercase tracking-widest">Mudar Disciplina</span>
        </button>

        <header className="mb-10 md:mb-12">
          <div className="flex items-center flex-wrap gap-2 md:gap-4 mb-2">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Med {selectedMed}</span>
            <span className="text-neutral-700">/</span>
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em]">{selectedCategory}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Escolha o Módulo</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {modules.map((mod) => (
            <div 
              key={mod} 
              onClick={() => setSelectedModule(mod)}
              className="bg-neutral-900/30 border border-neutral-800 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] cursor-pointer hover:bg-neutral-900 hover:border-blue-500 transition-all flex flex-col justify-between h-40 md:h-48 group shadow-lg"
            >
              <div>
                <span className="text-[9px] md:text-[10px] font-black text-neutral-600 uppercase tracking-widest block mb-1">Morfofuncional</span>
                <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">Módulo {mod}</h4>
              </div>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest group-hover:underline italic">Acessar Conteúdo →</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Conteúdo específico de Med 1 Módulo 1 (Histologia ou Anatomia)
  if (selectedMed === 1 && selectedModule === 1) {
    const lessons = selectedCategory === 'Histologia' ? HISTOLOGIA_MED1_M1 : ANATOMIA_MED1_M1;
    const accentColor = selectedCategory === 'Histologia' ? 'emerald' : 'indigo';

    if (activePdf) {
      return (
        <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500 px-4">
          <button onClick={closePdf} className="mb-6 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
            <span className="text-xs font-medium uppercase tracking-widest">Voltar para Lista</span>
          </button>

          <header className="mb-6">
             <h2 className="text-2xl font-black text-white tracking-tight">{activePdf.title}</h2>
             <p className="text-neutral-500 text-[10px] uppercase tracking-widest mt-1">Leitor Interno NexusBQ</p>
          </header>

          <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl relative h-[70vh] md:h-[85vh] border border-neutral-800">
            <iframe 
              src={activePdf.url} 
              className="w-full h-full border-none" 
              title={activePdf.title}
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 px-4 relative">
        {isOverLimit && (
          <div className="absolute inset-0 z-30 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-6 text-center rounded-[2rem]">
            <div className="max-w-md">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Limite Diário Atingido</h3>
              <p className="text-neutral-400 mb-8 text-sm leading-relaxed">
                Você atingiu o limite de <span className="text-white font-bold">10 conteúdos diários</span> do plano básico. O acesso será liberado amanhã.
              </p>
              <button onClick={onNavigateToPremium} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs">Conhecer Plano Premium</button>
            </div>
          </div>
        )}

        <button onClick={resetToModules} className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-medium uppercase tracking-widest">Voltar para Módulos</span>
        </button>

        <header className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <span className={`text-[10px] font-black text-${accentColor}-500 uppercase tracking-[0.4em]`}>{selectedCategory}</span>
            <span className="text-neutral-700">/</span>
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em]">Módulo 1</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Aulas do Módulo 1</h2>
        </header>

        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <div 
              key={index} 
              className={`bg-neutral-900/40 border border-neutral-800 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 hover:border-${accentColor}-500/30 transition-all group`}
            >
              <div className="flex items-center gap-4 w-full">
                <div className={`w-10 h-10 rounded-xl bg-${accentColor}-500/10 flex items-center justify-center text-${accentColor}-500 shrink-0 group-hover:bg-${accentColor}-500 group-hover:text-white transition-all`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <h3 className="text-white font-bold text-lg">{lesson.title}</h3>
              </div>
              <button 
                onClick={() => handleOpenPdf(lesson)}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-${accentColor}-500 hover:text-white transition-all text-center`}
              >
                Abrir Material
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback para módulos ainda sem conteúdo
  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in duration-500 px-4">
      <button onClick={resetToModules} className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
        <span className="text-xs font-medium uppercase tracking-widest">Voltar para Módulos</span>
      </button>

      <div className="bg-neutral-900/30 border border-neutral-800 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] text-center border-dashed">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-600 mx-auto mb-6 md:mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight">Conteúdo em Processamento</h3>
        <p className="text-neutral-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Estamos organizando os resumos, PDFs e lâminas digitais para o <span className="text-white font-bold">Módulo {selectedModule}</span> de <span className="text-white font-bold">{selectedCategory}</span>.
        </p>
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3">
           <div className="px-5 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-[9px] md:text-[10px] font-black uppercase text-neutral-600 tracking-widest">Resumos</div>
           <div className="px-5 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-[9px] md:text-[10px] font-black uppercase text-neutral-600 tracking-widest">Atlas PDF</div>
           <div className="px-5 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-[9px] md:text-[10px] font-black uppercase text-neutral-600 tracking-widest">Videoaulas</div>
        </div>
      </div>
    </div>
  );
};

export default MorfoView;
