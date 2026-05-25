import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Trophy,
  Info,
  Clock,
  LayoutDashboard,
  Table as TableIcon,
  ChevronRight,
  Palette,
  X,
  Target,
  Flag
} from "lucide-react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

// COLORES OFICIALES COPAFA
const COLORS = {
  blue: "#0f3654", 
  red: "#FF0000",  
  white: "#FFFFFF",
  bg: "#F1F5F9"
};

/**
 * ESTILOS DE SERIES PARA DISTINCIÓN VISUAL
 */
const SERIES_STYLES = {
  "Serie A - Sub 1": { 
    border: "border-l-[#10B981]", // Verde
    bg: "bg-[#ECFDF5]", 
    text: "text-[#065F46]",
    header: "bg-[#10B981]"
  },
  "Serie A - Sub 2": { 
    border: "border-l-[#F59E0B]", // Ámbar/Naranja
    bg: "bg-[#FFFBEB]", 
    text: "text-[#92400E]",
    header: "bg-[#F59E0B]"
  },
  "Serie B": { 
    border: "border-l-[#6366F1]", // Índigo/Morado
    bg: "bg-[#EEF2FF]", 
    text: "text-[#3730A3]",
    header: "bg-[#6366F1]"
  },
  "Finales": {
    border: "border-l-[#FF0000]", // Rojo
    bg: "bg-[#FEF2F2]",
    text: "text-[#991B1B]",
    header: "bg-[#EF4444]"
  }
};

/**
 * COLORES POR AÑO
 */
const YEAR_COLORS = {
  "inicial 3 años": { bg: "#00A99D", text: "#FFFFFF", label: "I3" }, // Verde Intenso
  "inicial 4 años": { bg: "#005EFF", text: "#FFFFFF", label: "I4" }, // Celeste
  "inicial 5 años": { bg: "#5F4B8B", text: "#FFFFFF", label: "I5" }, // Morado Ultra Violet
  "1ro primaria":   { bg: "#FE5000", text: "#FFFFFF", label: "1P" }, // Naranja
  "2do primaria":   { bg: "#F4ACB7", text: "#000000", label: "2P" }, // Rosado Limonada
  "3ro primaria":   { bg: "#000000", text: "#FFFFFF", label: "3P" }, // Negro
  "4to primaria":   { bg: "#40E0D0", text: "#000000", label: "4P" }, // Turquesa
  "5to primaria":   { bg: "#0F4C81", text: "#FFFFFF", label: "5P" }, // Azul Clásico
  "6to primaria":   { bg: "#DA291C", text: "#FFFFFF", label: "6P" }, // Rojo
  "1ro secundaria": { bg: "#FFFFFF", text: "#000000", label: "1S" }, // Blanco
  "2do secundaria": { bg: "#A2D927", text: "#000000", label: "2S" }, // Verde Limón
  "3ro secundaria": { bg: "#A9A9A9", text: "#FFFFFF", label: "3S" }, // Plomo
  "4to secundaria": { bg: "#FFDE00", text: "#000000", label: "4S" }, // Amarillo
  "5to secundaria": { bg: "#722F37", text: "#FFFFFF", label: "5S" }, // Guinda
};

const getYearStyle = (name) => {
  if (!name) return { bg: "#64748B", text: "#FFFFFF", label: "SS" };
  const key = name.toLowerCase().trim();
  const foundKey = Object.keys(YEAR_COLORS).find(k => key.includes(k));
  return foundKey ? YEAR_COLORS[foundKey] : { bg: "#64748B", text: "#FFFFFF", label: "SS" };
};

const CopafaLogoFull = ({ variant = "light", className = "h-16" }) => {
  return (
    <img 
      src="/COPAFA.png" 
      alt="Logo COPAFA" 
      className={`${className} object-contain`} 
    />
  );
};

export default function Home() {
  const [selectedSport, setSelectedSport] = useState(null);
  const [currentView, setCurrentView] = useState({ page: "home", sport: null, gender: null });
  const [activeTab, setActiveTab] = useState("fixture");
  const [showLegend, setShowLegend] = useState(false);
  const [fixtures, setFixtures] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const qFixtures = query(collection(db, 'fixtures'), orderBy('fecha'), orderBy('hora'));
    const unsubscribeFixtures = onSnapshot(qFixtures, (snapshot) => {
      setFixtures(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error("Error fetching fixtures: ", error));

    const qPositions = query(collection(db, 'positions'), orderBy('puntos', 'desc'), orderBy('golesFavor', 'desc'));
    const unsubscribePositions = onSnapshot(qPositions, (snapshot) => {
      setPositions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error("Error fetching positions: ", error));

    return () => {
      unsubscribeFixtures();
      unsubscribePositions();
    };
  }, []);

  const sportsData = useMemo(() => [
    { id: "futbol", name: "Fútbol", icon: "⚽" },
    { id: "basket", name: "Básquet", icon: "🏀" },
    { id: "voley", name: "Vóley", icon: "🏐" },
  ], []);

  const handleSportClick = (sportId) => setSelectedSport(sportId);

  const handleGenderSelect = (gender) => {
    setCurrentView({ page: "sportDetail", sport: selectedSport, gender: gender });
    setSelectedSport(null);
    setActiveTab("fixture");
  };

  const TeamCard = ({ name, align = "center", small = false }) => {
    const style = getYearStyle(name);
    return (
      <div className={`flex flex-col ${align === 'right' ? 'items-end' : align === 'left' ? 'items-start' : 'items-center'} gap-1`}>
        <div 
          className={`rounded-xl font-black shadow-md uppercase tracking-tight text-center ${small ? 'px-2 py-0.5 text-[10px]' : 'px-4 py-1.5 text-[12px]'}`}
          style={{ backgroundColor: style.bg, color: style.text }}
        >
          {name}
        </div>
      </div>
    );
  };

  const LegendModal = () => (
    <AnimatePresence>
      {showLegend && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowLegend(false)} />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-sm rounded-[3rem] shadow-2xl p-8 border-t-8 border-[#FF0000]">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-black text-[#0f3654] uppercase italic">Leyenda de Colores</h4>
              <button onClick={() => setShowLegend(false)} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-red transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(YEAR_COLORS).map(([name, style]) => (
                <div key={name} className="flex items-center gap-3 p-2 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-6 rounded-md shadow-sm" style={{ backgroundColor: style.bg }} />
                  <span className="text-[10px] font-black uppercase text-[#0f3654]">{name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const renderStandings = (sport, gender) => {
    // This is a placeholder as the image does not specify standings grouping
    const filteredPositions = positions;

    return (
      <div className="space-y-8 mt-4 pb-12">
        {filteredPositions.length === 0 ? <p>No hay datos de posiciones.</p> :
         <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
           <div className={`bg-gray-500 px-8 py-4 flex justify-between items-center`}>
             <div className="flex items-center gap-2">
               <Trophy size={16} className="text-white" />
               <h3 className="text-white font-black uppercase italic tracking-wider">Tabla General</h3>
             </div>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-50 border-b border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400">
                   <th className="px-6 py-4">EQUIPO</th>
                   <th className="px-2 py-4 text-center">PJ</th>
                   <th className="px-2 py-4 text-center">PG</th>
                   <th className="px-2 py-4 text-center">PE</th>
                   <th className="px-2 py-4 text-center">PP</th>
                   <th className="px-2 py-4 text-center">GF</th>
                   <th className="px-2 py-4 text-center">GC</th>
                   <th className="px-4 py-4 text-center text-[#FF0000]">PTS</th>
                 </tr>
               </thead>
               <tbody>
                 {filteredPositions.map((team, i) => (
                   <tr key={team.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors">
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-4">
                         <span className="w-4 h-4 flex items-center justify-center font-black text-[10px] text-slate-300 italic">{i + 1}º</span>
                         <TeamCard name={team.nombreEquipo} align="left" small />
                       </div>
                     </td>
                     <td className="px-2 py-4 text-center text-xs font-bold text-slate-500">{team.partidosJugados}</td>
                     <td className="px-2 py-4 text-center text-xs font-bold text-slate-500">{team.victorias}</td>
                     <td className="px-2 py-4 text-center text-xs font-bold text-slate-500">{team.empates}</td>
                     <td className="px-2 py-4 text-center text-xs font-bold text-slate-500">{team.derrotas}</td>
                     <td className="px-2 py-4 text-center text-xs font-bold text-slate-500">{team.golesFavor}</td>
                     <td className="px-2 py-4 text-center text-xs font-bold text-slate-500">{team.golesContra}</td>
                     <td className="px-4 py-4 text-center font-black text-[#FF0000] text-lg">{team.puntos}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
        }
      </div>
    );
  };

  if (currentView.page === "sportDetail") {
    const sportInfo = sportsData.find(s => s.id === currentView.sport);

    const filteredFixtures = fixtures.filter(fix => {
        const sportMatch = fix.sport && fix.sport.toLowerCase() === currentView.sport;
        const genderMatch = fix.rama && fix.rama.toLowerCase() === currentView.gender.toLowerCase();
        return sportMatch && genderMatch;
    });

    return (
      <div className="min-h-screen bg-[#F1F5F9] text-[#0f3654]">
        <header className="bg-[#0f3654] p-6 shadow-xl sticky top-0 z-50">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="cursor-pointer" onClick={() => setCurrentView({ page: "home", sport: null, gender: null })}>
              <CopafaLogoFull variant="light" className="h-16 md:h-20 hover:scale-105 transition-transform" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowLegend(true)} className="bg-white/10 p-2.5 rounded-xl text-white hover:bg-white/20 shadow-inner transition-colors"><Palette size={20}/></button>
              <button onClick={() => setCurrentView({ page: "home", sport: null, gender: null })} className="bg-white/10 text-white px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 hover:bg-white/20 transition-all">
                <ChevronLeft size={16} /> VOLVER
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto p-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{sportInfo?.icon}</div>
              <div>
                <h1 className="text-5xl font-black uppercase italic tracking-tighter">{sportInfo?.name}</h1>
                <div className="bg-[#FF0000] text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase mt-1 inline-block">{currentView.gender}</div>
              </div>
            </div>
            <div className="flex bg-white p-1 rounded-2xl shadow-md border border-slate-200">
              <button onClick={() => setActiveTab("fixture")} className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${activeTab === "fixture" ? "bg-[#0f3654] text-white shadow-lg" : "text-slate-400 hover:text-[#0f3654]"}`}>Fixture</button>
              <button onClick={() => setActiveTab("tabla")} className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${activeTab === "tabla" ? "bg-[#0f3654] text-white shadow-lg" : "text-slate-400 hover:text-[#0f3654]"}`}>Posiciones</button>
            </div>
          </div>

          <div className="grid gap-4">
            {activeTab === "fixture" ? (
              filteredFixtures.length > 0 ? filteredFixtures.map((m, i) => {
                const sStyle = SERIES_STYLES[m.serie] || { border: "border-l-slate-200", text: "text-slate-400", bg: "bg-slate-50" };
                return (
                  <div key={i} className={`bg-white rounded-[2.8rem] p-12 shadow-sm border border-slate-100 border-l-[12px] ${sStyle.border} flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group hover:shadow-xl transition-all`}>
                    <div className={`absolute top-0 left-4 ${sStyle.bg} px-5 py-1.5 text-[9px] font-black ${sStyle.text} rounded-b-2xl uppercase tracking-widest border border-t-0 border-slate-100`}>
                      {m.fecha} • {m.serie}
                    </div>
                    <div className="flex-1"><TeamCard name={m.equipoLocal} align="right" /></div>
                    <div className="flex flex-col items-center px-12 border-x-2 border-slate-50">
                      <div className="flex items-center gap-6">
                        <span className="text-5xl font-black">{m.golesLocal}</span>
                        <div className="text-[#FF0000] font-black text-2xl italic px-2">VS</div>
                        <span className="text-5xl font-black">{m.golesVisitante}</span>
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-[11px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full"><Clock size={14} className="text-[#FF0000]"/> {m.hora} HRS</div>
                    </div>
                    <div className="flex-1"><TeamCard name={m.equipoVisitante} align="left" /></div>
                  </div>
                );
              }) : <p>No hay fixtures para esta categoría.</p>
            ) : renderStandings(currentView.sport, currentView.gender)}
          </div>
        </main>
        <LegendModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden overflow-y-auto bg-[#F1F5F9] text-[#0f3654] font-sans flex flex-col items-center">
      <button onClick={() => setShowLegend(true)} className="fixed bottom-4 right-4 z-50 bg-[#0f3654] text-white p-3 md:p-4 rounded-full shadow-2xl border-4 border-white flex items-center gap-2 hover:scale-110 transition-all active:scale-95 shadow-blue-950/20"><Palette size={20} /><span className="font-black uppercase text-[10px] pr-2 tracking-tighter hidden md:inline">Colores SSCC</span></button>
      
      <section className="w-full bg-[#0f3654] pt-8 pb-16 md:pb-20 px-4 md:px-6 relative overflow-hidden flex flex-col items-center shrink-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] border-[30px] md:border-[50px] border-white rounded-full blur-3xl" />
          <div className="absolute bottom-[-30%] left-[-20%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] border-[50px] md:border-[80px] border-[#FF0000] rounded-full blur-3xl" />
        </div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="z-10 mb-4 md:mb-6 cursor-pointer" onClick={() => setCurrentView({ page: "home", sport: null, gender: null })}><CopafaLogoFull variant="light" className="h-24 md:h-56 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform" /></motion.div>
        
        <div className="text-center z-10 px-2 md:px-4">
          <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-widest leading-[0.95] mb-4 max-w-5xl">
            JUEGOS DEPORTIVOS <br className="hidden md:block"/>
            <span className="text-[#FF0000]"> DE CONFRATERNIDAD 2026</span> <br/><br/>
            <span className="text-lg md:text-3xl tracking-[0.2em] md:tracking-[0.3em] opacity-80 not-italic font-bold mt-2 md:mt-0 block">Colegio de los Sagrados Corazones</span>
          </h2>
          <div className="h-1 w-16 md:w-24 bg-[#FF0000] mx-auto rounded-full mb-4" />
          </div>
      </section>

      <div className="max-w-5xl w-full px-4 md:px-6 -mt-8 md:-mt-12 z-20 flex-1 flex flex-col min-h-0 mb-8 md:mb-4 justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {sportsData.map((sport, index) => (
            <motion.div key={sport.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} onClick={() => handleSportClick(sport.id)} className="group cursor-pointer bg-white rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-6 shadow-xl border-b-[6px] md:border-b-[8px] border-slate-200 hover:border-[#FF0000] transition-all relative overflow-hidden flex flex-row md:flex-col items-center md:justify-center gap-4 md:gap-0">
              <div className="bg-slate-50 rounded-2xl md:rounded-[2rem] group-hover:rounded-none w-20 h-20 md:w-auto md:h-28 flex items-center justify-center transition-all duration-300 group-hover:bg-[#0f3654] group-hover:shadow-inner shrink-0"><span className="text-4xl md:text-5xl transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:drop-shadow-2xl">{sport.icon}</span></div>
              <div className="pt-0 md:pt-4 text-left md:text-center flex-1">
                <h2 className="text-2xl md:text-3xl font-black uppercase italic group-hover:text-[#0f3654] transition-colors tracking-tighter mb-1">{sport.name}</h2>
                <div className="flex items-center justify-start md:justify-center gap-1 md:gap-2 text-slate-300 font-black uppercase text-[8px] md:text-[9px] tracking-widest group-hover:text-[#FF0000]">VER RESULTADOS <ChevronRight size={12} className="md:w-[14px] md:h-[14px]" /></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <footer className="w-full py-6 md:py-4 border-t border-slate-200 mt-auto flex flex-col items-center gap-3 md:gap-4 px-4 md:px-6 opacity-30 grayscale shrink-0"><CopafaLogoFull variant="dark" className="h-6 md:h-8" /><div className="flex gap-4 md:gap-6"><Flag size={16} className="md:w-5 md:h-5" /><Target size={16} className="md:w-5 md:h-5" /><LayoutDashboard size={16} className="md:w-5 md:h-5" /></div><p className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-center">SSCC Arequipa • Pasión por el deporte</p></footer>
      
      <LegendModal />

      <AnimatePresence>
        {selectedSport && (
          <div className="fixed inset-0 flex items-center justify-center z-[300] p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#0f3654]/98 backdrop-blur-md" onClick={() => setSelectedSport(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[3rem] shadow-2xl w-full max-w-sm relative z-10 p-8 border-t-8 border-[#FF0000] text-center">
              <div className="text-6xl mb-6">{sportsData.find(s => s.id === selectedSport)?.icon}</div>
              <h3 className="text-4xl font-black uppercase italic mb-8 text-[#0f3654]">{sportsData.find(s => s.id === selectedSport)?.name}</h3>
              <div className="flex flex-col gap-3">
                {selectedSport === "voley" ? (
                  <><button onClick={() => handleGenderSelect("DAMAS")} className="bg-[#FF0000] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl hover:scale-105 transition-all">Damas</button><button onClick={() => handleGenderSelect("MIXTO")} className="bg-[#0f3654] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl hover:scale-105 transition-all">Mixto</button></>
                ) : (
                  <><button onClick={() => handleGenderSelect("VARONES")} className="bg-[#0f3654] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl hover:scale-105 transition-all">Varones</button><button onClick={() => handleGenderSelect("DAMAS")} className="bg-[#FF0000] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl hover:scale-105 transition-all">Damas</button></>
                )}
              </div>
              <button onClick={() => setSelectedSport(null)} className="mt-8 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-[#FF0000] transition-colors">Volver</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}