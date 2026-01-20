
import React from 'react';
import { UserStats, ActivityItem } from '../types';

interface RankingUser {
  rank: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
  isPremium: boolean;
}

interface StatsDashboardProps {
  stats: UserStats;
  ranking: RankingUser[];
  onNavigate: (view: any, metadata?: any) => void;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, ranking, onNavigate }) => {
  const getLevel = (count: number) => {
    if (count < 50) return "Iniciante";
    if (count < 150) return "Intermediário";
    if (count < 300) return "Avançado";
    return "Veterano";
  };

  const level = getLevel(stats.totalAnswered);
  
  const recentActivities = stats.recentActivity || [];
  const latestActivity = recentActivities[0];
  const otherActivities = recentActivities.slice(1);

  return (
    <div className="animate-in fade-in duration-500 space-y-10">
      {/* 1. CONTINUAR ESTUDANDO (Bloco Principal) */}
      {recentActivities.length > 0 && (
        <section className="animate-in slide-in-from-top-4 duration-700">
           <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-4 px-2">
              Continuar Estudando <div className="h-px flex-grow bg-neutral-800/50"></div>
           </h3>
           
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-2">
              {/* Card Destaque: Último Acessado */}
              <div 
                onClick={() => onNavigate(latestActivity.type === 'aula' ? 'premium' : latestActivity.type === 'apostila' ? 'pbl' : 'questoes', latestActivity)}
                className="lg:col-span-5 bg-gradient-to-br from-neutral-900 to-[#0c0c0c] border border-blue-600/30 p-8 rounded-[2.5rem] cursor-pointer hover:border-blue-500 transition-all group relative overflow-hidden shadow-2xl shadow-blue-950/20"
              >
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all"></div>
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-4 block">Retomar última atividade</span>
                <div className="flex items-center gap-5 mb-6">
                   <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl text-xl">
                      {latestActivity.type === 'aula' ? '▶' : latestActivity.type === 'apostila' ? '📄' : '❓'}
                   </div>
                   <div className="min-w-0">
                      <h4 className="text-2xl font-black text-white leading-tight line-clamp-1 group-hover:text-blue-400 transition-colors">{latestActivity.title}</h4>
                      <p className="text-neutral-500 text-xs mt-1">{latestActivity.subtitle}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-white">
                   Clique para abrir <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>

              {/* Grid: Atividades Recentes */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherActivities.map((act, i) => (
                  <div 
                    key={i} 
                    onClick={() => onNavigate(act.type === 'aula' ? 'premium' : act.type === 'apostila' ? 'pbl' : 'questoes', act)}
                    className="bg-neutral-900/40 border border-neutral-800 p-5 rounded-2xl cursor-pointer hover:bg-neutral-900 hover:border-neutral-700 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-sm group-hover:bg-blue-600/20 group-hover:text-blue-500 transition-all shrink-0">
                      {act.type === 'aula' ? '▶' : act.type === 'apostila' ? '📄' : '❓'}
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-[13px] font-bold text-white truncate group-hover:text-blue-400">{act.title}</h5>
                      <span className="text-[9px] text-neutral-600 uppercase tracking-widest font-black">{act.type}</span>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </section>
      )}

      {/* 2. SUGESTÃO DE FOCO (SÓ PREMIUM - DINÂMICA) */}
      {stats.isPremium && stats.weakestTheme && (
        <section className="animate-in fade-in duration-1000 px-2">
           <div className="bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-600/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-6 text-center md:text-left">
                 <div className="w-14 h-14 bg-blue-600/20 rounded-[1.5rem] flex items-center justify-center text-blue-500 text-3xl shadow-lg">⚡</div>
                 <div>
                    <h4 className="text-xl font-black text-white tracking-tight">Foco Sugerido</h4>
                    <p className="text-neutral-400 text-sm mt-1">Percebemos que você tem tido mais dificuldade em <span className="text-blue-400 font-bold underline decoration-blue-600/30 underline-offset-4">{stats.weakestTheme.theme}</span>. Que tal revisar?</p>
                 </div>
              </div>
              <button 
                onClick={() => onNavigate('premium')} 
                className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-4 rounded-2xl text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 transition-all active:scale-95 whitespace-nowrap"
              >
                Praticar Agora
              </button>
           </div>
        </section>
      )}

      {/* 3. ESTATÍSTICAS MINIMALISTAS */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-2">
        <div className="bg-neutral-900/30 border border-neutral-800 p-10 rounded-[3rem] text-center hover:border-blue-600/20 transition-all group shadow-lg">
          <span className="text-neutral-600 text-[9px] font-black uppercase tracking-[0.4em] mb-6 block">Questões Feitas</span>
          <p className="text-5xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform">{stats.totalAnswered}</p>
          <div className="mt-6 flex justify-center gap-6 text-[10px] font-black">
             <div className="flex flex-col"><span className="text-emerald-500">{stats.totalCorrect}</span><span className="text-neutral-700 uppercase text-[8px]">Acertos</span></div>
             <div className="w-px h-6 bg-neutral-800"></div>
             <div className="flex flex-col"><span className="text-red-500">{stats.totalErrors}</span><span className="text-neutral-700 uppercase text-[8px]">Erros</span></div>
          </div>
        </div>

        <div className="bg-neutral-900/30 border border-neutral-800 p-10 rounded-[3rem] text-center hover:border-purple-600/20 transition-all group shadow-lg">
          <span className="text-neutral-600 text-[9px] font-black uppercase tracking-[0.4em] mb-6 block">Status Atual</span>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-3xl font-black text-white tracking-tight uppercase italic">{level}</p>
            <div className="px-4 py-1.5 bg-purple-600/10 rounded-full border border-purple-500/20 text-purple-400 text-[9px] font-black tracking-widest uppercase">Expertise</div>
          </div>
        </div>

        <div className="bg-neutral-900/30 border border-neutral-800 p-10 rounded-[3rem] text-center hover:border-orange-600/20 transition-all group shadow-lg">
          <span className="text-neutral-600 text-[9px] font-black uppercase tracking-[0.4em] mb-6 block">Streak Diário</span>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-3">
               <p className="text-5xl font-black text-white tracking-tighter">{stats.streak}</p>
               <div className={`text-orange-500 ${stats.streak > 0 ? 'animate-pulse' : 'opacity-20'}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.45 12.15l-2.42 2.42a1.2 1.2 0 01-1.7 0l-2.42-2.42a1.2 1.2 0 011.7-1.7l.37.37V8.5a1.2 1.2 0 012.4 0v4.32l.37-.37a1.2 1.2 0 011.7 1.7z"/></svg>
               </div>
            </div>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Dias Seguidos</span>
          </div>
        </div>
      </section>

      {/* 4. RANKING COM IDENTIFICAÇÃO PREMIUM */}
      <section className="bg-neutral-900/30 border border-neutral-800 rounded-[3rem] overflow-hidden mx-2 shadow-2xl">
        <div className="p-8 border-b border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900/50">
          <h3 className="font-black text-white text-xl tracking-tight uppercase italic">Líderes do Ciclo</h3>
          <div className="flex items-center gap-3">
             <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-black bg-neutral-950 px-3 py-1 rounded-full border border-neutral-800">{stats.ciclo}</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-neutral-600 border-b border-neutral-800/50 bg-neutral-950/20">
                <th className="px-10 py-5 font-black uppercase text-[9px] tracking-[0.4em]">Pos</th>
                <th className="px-10 py-5 font-black uppercase text-[9px] tracking-[0.4em]">Estudante</th>
                <th className="px-10 py-5 font-black uppercase text-[9px] tracking-[0.4em] text-right">Pontuação</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((user, idx) => (
                <tr 
                  key={idx} 
                  className={`border-b border-neutral-800/30 transition-all ${user.isCurrentUser ? 'bg-blue-600/5' : 'hover:bg-neutral-800/40'}`}
                >
                  <td className="px-10 py-6 font-mono text-neutral-500 text-xs">
                    {user.rank.toString().padStart(2, '0')}
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                       <span className={`font-bold whitespace-nowrap ${user.isCurrentUser ? 'text-blue-400' : 'text-neutral-300'}`}>
                         {user.isCurrentUser ? 'Você' : user.name}
                       </span>
                       {user.isPremium && (
                         <div className="w-5 h-5 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 text-[10px] shadow-sm border border-blue-600/30" title="Assinante Premium">
                           ✨
                         </div>
                       )}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right font-mono text-xs font-black text-neutral-400">
                    {user.points.toLocaleString()} <span className="text-[8px] text-neutral-600 ml-1">PTS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StatsDashboard;
