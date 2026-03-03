'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Building {
    id: string;
    username: string;
    level: number;
    position: { x: number; y: number };
}

const CityMap: React.FC<{ buildings: Building[] }> = ({ buildings }) => {
    const gridSize = 20;
    const tileSize = 60;

    return (
        <div className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center bg-slate-950">
            <div
                className="relative isometric"
                style={{
                    width: `${gridSize * tileSize}px`,
                    height: `${gridSize * tileSize}px`,
                }}
            >
                {/* Grid Lines */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(to right, #00f2fe 1px, transparent 1px), linear-gradient(to bottom, #00f2fe 1px, transparent 1px)`,
                        backgroundSize: `${tileSize}px ${tileSize}px`,
                    }}
                />

                {/* Buildings */}
                {buildings.map((building) => (
                    <BuildingItem key={building.id} building={building} tileSize={tileSize} />
                ))}
            </div>
        </div>
    );
};

const BuildingItem: React.FC<{ building: Building; tileSize: number }> = ({ building, tileSize }) => {
    const { level, position } = building;

    // Height based on level
    const heightMultiplier = level * 10;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="absolute cursor-pointer group"
            style={{
                left: `${position.x * tileSize}px`,
                top: `${position.y * tileSize}px`,
                width: `${tileSize - 4}px`,
                height: `${tileSize - 4}px`,
                zIndex: position.x + position.y, // Basic depth sorting
            }}
        >
            {/* 3D-like Box Effect */}
            <div className="relative w-full h-full transform-gpu">
                {/* Back face (top) */}
                <div
                    className={`absolute inset-0 bg-cyan-400 group-hover:bg-cyan-300 transition-colors border border-white/20`}
                    style={{ transform: `translateZ(${heightMultiplier}px)` }}
                />
                {/* Side faces */}
                <div
                    className="absolute bottom-0 left-0 w-full bg-cyan-600 border border-white/10"
                    style={{ height: `${heightMultiplier}px`, transform: `rotateX(-90deg)`, transformOrigin: 'bottom' }}
                />
                <div
                    className="absolute top-0 right-0 h-full bg-cyan-800 border border-white/10"
                    style={{ width: `${heightMultiplier}px`, transform: `rotateY(90deg) rotateX(0deg)`, transformOrigin: 'right' }}
                />
            </div>

            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 hidden group-hover:block glass px-3 py-1 rounded text-xs whitespace-nowrap z-50">
                <p className="font-bold">{building.username}</p>
                <p className="text-cyan-400">Level {level}</p>
            </div>
        </motion.div>
    );
};

export default CityMap;
