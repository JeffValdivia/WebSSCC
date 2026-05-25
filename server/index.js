try {
  require('dotenv').config();
} catch (e) {
  // dotenv es opcional
}

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors()); // Permite la comunicación desde el cliente

// Servir archivos estáticos del frontend compilado (para Hostinger)
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));

const port = process.env.PORT || 3001; // Puerto para el servidor

// --- DATOS ESTÁTICOS DE EJEMPLO (los mismos que estaban en Home.jsx) ---

const FIXTURE_DATA = {
    fulbito: {
      varones: [
        { id: 1, hora: "9:30", equipoA: "Inicial 3 años", equipoB: "Inicial 5 años", golesA: 0, golesB: 0, rama: "VARONES" },
        { id: 2, hora: "10:15", equipoA: "3ro Secundaria", equipoB: "1ro Secundaria", golesA: 0, golesB: 0, rama: "VARONES" },
        { id: 11, hora: "15:25", equipoA: "Inicial 4 años", equipoB: "1ro Primaria", golesA: 0, golesB: 0, rama: "VARONES" },
        { id: 12, hora: "16:10", equipoA: "4to Secundaria", equipoB: "2do Secundaria", golesA: 0, golesB: 0, rama: "VARONES" },
        { id: 13, hora: "16:55", equipoA: "6to Primaria", equipoB: "5to Secundaria", golesA: 0, golesB: 0, rama: "VARONES" },
      ],
      damas: [
        { id: 3, hora: "11:00", equipoA: "Inicial 3 años", equipoB: "Inicial 5 años", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 4, hora: "11:25", equipoA: "3ro Secundaria", equipoB: "1ro Secundaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 5, hora: "13:20", equipoA: "4to Secundaria", equipoB: "2do Secundaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 6, hora: "13:45", equipoA: "5to Primaria", equipoB: "2do Primaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 7, hora: "14:10", equipoA: "Inicial 4 años", equipoB: "1ro Primaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 8, hora: "14:35", equipoA: "4to Primaria", equipoB: "3ro Primaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 9, hora: "15:00", equipoA: "6to Primaria", equipoB: "5to Secundaria", golesA: 0, golesB: 0, rama: "DAMAS" },
      ]
    },
    basket: {
      varones: [
        { id: 101, hora: "9:30", equipoA: "6to Primaria", equipoB: "5to Secundaria", golesA: 0, golesB: 0, rama: "VARONES" },
        { id: 102, hora: "10:15", equipoA: "4to Primaria", equipoB: "3ro Primaria", golesA: 0, golesB: 0, rama: "VARONES" },
        { id: 103, hora: "11:50", equipoA: "Inicial 3 años", equipoB: "Inicial 5 años", golesA: 0, golesB: 0, rama: "VARONES" },
        { id: 104, hora: "12:35", equipoA: "4to Secundaria", equipoB: "2do Secundaria", golesA: 0, golesB: 0, rama: "VARONES" },
        { id: 105, hora: "15:25", equipoA: "3ro Secundaria", equipoB: "1ro Secundaria", golesA: 0, golesB: 0, rama: "VARONES" },
        { id: 106, hora: "16:10", equipoA: "5to Primaria", equipoB: "2do Primaria", golesA: 0, golesB: 0, rama: "VARONES" },
        { id: 107, hora: "16:55", equipoA: "Inicial 4 años", equipoB: "1ro Primaria", golesA: 0, golesB: 0, rama: "VARONES" }
      ],
      damas: [
        { id: 108, hora: "11:00", equipoA: "6to Primaria", equipoB: "5to Secundaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 109, hora: "11:25", equipoA: "4to Secundaria", equipoB: "2do Secundaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 110, hora: "13:20", equipoA: "4to Primaria", equipoB: "3ro Primaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 111, hora: "13:45", equipoA: "3ro Secundaria", equipoB: "1ro Secundaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 112, hora: "14:10", equipoA: "Inicial 3 años", equipoB: "Inicial 5 años", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 113, hora: "14:35", equipoA: "5to Primaria", equipoB: "2do Primaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 114, hora: "15:00", equipoA: "Inicial 4 años", equipoB: "1ro Primaria", golesA: 0, golesB: 0, rama: "DAMAS" }
      ]
    },
    voley: {
      damas: [
        { id: 201, hora: "9:30", equipoA: "Inicial 4 años", equipoB: "1ro Primaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 202, hora: "11:50", equipoA: "4to Primaria", equipoB: "3ro Primaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 203, hora: "12:35", equipoA: "5to Primaria", equipoB: "2do Primaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 204, hora: "13:20", equipoA: "Inicial 3 años", equipoB: "Inicial 5 años", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 205, hora: "15:20", equipoA: "4to Secundaria", equipoB: "2do Secundaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 206, hora: "16:05", equipoA: "3ro Secundaria", equipoB: "1ro Secundaria", golesA: 0, golesB: 0, rama: "DAMAS" },
        { id: 207, hora: "16:50", equipoA: "6to Primaria", equipoB: "5to Secundaria", golesA: 0, golesB: 0, rama: "DAMAS" }
      ],
      mixto: [
        { id: 301, hora: "9:30", equipoA: "5to Primaria", equipoB: "2do Primaria", golesA: 0, golesB: 0, rama: "MIXTO" },
        { id: 302, hora: "10:15", equipoA: "4to Secundaria", equipoB: "2do Secundaria", golesA: 0, golesB: 0, rama: "MIXTO" },
        { id: 303, hora: "11:00", equipoA: "Inicial 4 años", equipoB: "1ro Primaria", golesA: 0, golesB: 0, rama: "MIXTO" },
        { id: 304, hora: "11:50", equipoA: "6to Primaria", equipoB: "5to Secundaria", golesA: 0, golesB: 0, rama: "MIXTO" },
        { id: 305, hora: "12:35", equipoA: "3ro Secundaria", equipoB: "1ro Secundaria", golesA: 0, golesB: 0, rama: "MIXTO" },
        { id: 306, hora: "15:00", equipoA: "Inicial 3 años", equipoB: "Inicial 5 años", golesA: 0, golesB: 0, rama: "MIXTO" },
        { id: 307, hora: "16:30", equipoA: "4to Primaria", equipoB: "3ro Primaria", golesA: 0, golesB: 0, rama: "MIXTO" }
      ]
    }
  };
  
  const STANDINGS_DATA = {
    fulbito: {
      varones: [
        { grupo: "Grupo A", teams: [
          { id: 1, promo: "Inicial 3 años", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 2, promo: "Inicial 4 años", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 3, promo: "Inicial 5 años", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 4, promo: "1ro Primaria",   pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 5, promo: "2do Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 6, promo: "3ro Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 7, promo: "4to Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 8, promo: "5to Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
        ]},
        { grupo: "Grupo B", teams: [
            { id: 9, promo: "6to Primaria",   pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
            { id: 10, promo: "1ro Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
            { id: 11, promo: "2do Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
            { id: 12, promo: "3ro Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
            { id: 13, promo: "4to Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
            { id: 14, promo: "5to Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
        ]},
      ],
      damas: []
    },
    basket: {
      varones: [
        { grupo: "Grupo A", teams: [
          { id: 1, promo: "Inicial 3 años", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 2, promo: "Inicial 4 años", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 3, promo: "Inicial 5 años", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 4, promo: "1ro Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 5, promo: "2do Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 6, promo: "3ro Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 7, promo: "4to Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 8, promo: "5to Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0}
        ]},
        { grupo: "Grupo B", teams: [
          { id: 9, promo: "6to Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 10, promo: "1ro Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 11, promo: "2do Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 12, promo: "3ro Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 13, promo: "4to Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 14, promo: "5to Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0}
        ]}
      ],
      damas: [
        { grupo: "Grupo A", teams: [
          { id: 1, promo: "Inicial 3 años", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 2, promo: "Inicial 4 años", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 3, promo: "Inicial 5 años", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 4, promo: "1ro Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 5, promo: "2do Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 6, promo: "3ro Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 7, promo: "4to Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 8, promo: "5to Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0}
        ]},
        { grupo: "Grupo B", teams: [
          { id: 9, promo: "6to Primaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 10, promo: "1ro Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 11, promo: "2do Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 12, promo: "3ro Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 13, promo: "4to Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0},
          { id: 14, promo: "5to Secundaria", pj: 0, pg: 0, pe: 0, pp: 0, wo: 0, gf: 0, gc: 0, dif: "+0", ta: 0, tr: 0, pts: 0}
        ]}
      ]
    },
    voley: {
      damas: [
        { grupo: "Grupo A", teams: [
          { id: 1, promo: "Inicial 3 años", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 2, promo: "Inicial 4 años", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 3, promo: "Inicial 5 años", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 4, promo: "1ro Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 5, promo: "2do Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 6, promo: "3ro Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 7, promo: "4to Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 8, promo: "5to Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0}
        ]},
        { grupo: "Grupo B", teams: [
          { id: 9, promo: "6to Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 10, promo: "1ro Secundaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 11, promo: "2do Secundaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 12, promo: "3ro Secundaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 13, promo: "4to Secundaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 14, promo: "5to Secundaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0}
        ]}
      ],
      mixto: [
        { grupo: "Grupo A", teams: [
          { id: 1, promo: "Inicial 3 años", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 2, promo: "Inicial 4 años", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 3, promo: "Inicial 5 años", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 4, promo: "1ro Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 5, promo: "2do Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 6, promo: "3ro Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 7, promo: "4to Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 8, promo: "5to Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0}
        ]},
        { grupo: "Grupo B", teams: [
          { id: 9, promo: "6to Primaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 10, promo: "1ro Secundaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 11, promo: "2do Secundaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 12, promo: "3ro Secundaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 13, promo: "4to Secundaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0},
          { id: 14, promo: "5to Secundaria", pj: 0, pg: 0, pp: 0, wo: 0, sf: 0, sc: 0, sf_dif: "+0", pf: 0, pc: 0, p_dif: "+0", pts: 0}
        ]}
      ]
    }
  };
  

// --- ENDPOINTS DE LA API ---

app.get('/api/fixtures', (req, res) => {
  res.json(FIXTURE_DATA);
});

app.get('/api/standings', (req, res) => {
  res.json(STANDINGS_DATA);
});

// Ruta SPA: Redireccionar todas las rutas no coincidentes a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
