--[user]=============================================================================================================================================
INSERT INTO poster (firstName, lastName, userName, email, userLocation, aboutME) Values ('Charles', 'Vitanza', 'Chuck_Tanza', '1002charles@gmail.com', 'Frederick, MD', 'Just a boy');

--[forum]============================================================================================================================================
INSERT INTO forum (time, userName, title, post) VALUES (now(), 'Chuck_Tanza', 'Forum', 'This application was created with the intention of allowing people to post there love or hate for the Metroid series. I apologize for the somewhat limited application at moment, my hope is to include the rest of the games and eventually expand to all Metroidvania games.');

--[Games]===========================================================================================================================================
INSERT INTO games (title, publisher, year, console) VALUES ('Metroid Prime', 'Nintendo', 2002, 'Gamecube');
INSERT INTO games (title, publisher, year, console) VALUES ('Metroid Prime 2: Echoes', 'Nintendo', 2004, 'Gamecube');
INSERT INTO games (title, publisher, year, console) VALUES ('Metroid Prime 3: Corruption', 'Nintendo', 2007, 'Gamecube');
INSERT INTO games (title, publisher, year, console) VALUES ('Metroid Prime: Trilogy', 'Nintendo', 2009, 'WII');
INSERT INTO games (title, publisher, year, console) VALUES ('Metroid Prime Hunters', 'Nintendo', 2006, 'Nintendo DS');
INSERT INTO games (title, publisher, year, console) VALUES ('Metroid Prime Pinball', 'Nintendo', 2005, 'Nintendo DS');
INSERT INTO games (title, publisher, year, console) VALUES ('Metroid Prime: Federation Force', 'Nintendo', 20016, 'Nintendo 3DS');

--[Suits]===========================================================================================================================================
INSERT INTO suits (name, how_to_obtain, purpose) VALUES ('Power Suit', 'Starting Gear', 'Standard Suit');
INSERT INTO suits (name, game, how_to_obtain, purpose) VALUES ('Varia Suit', 'Metroid Prime', 'Defeat Flaahgra(Metroid Prime)', 'Remove damage from environmental hazards');
INSERT INTO suits (name, game, how_to_obtain, purpose) VALUES ('Gravity Suit', 'Metroid Prime', 'Gravity Chamber in Phendrana Drifts(Metroid Prime)', 'Effectively negates liquid and air friction');
INSERT INTO suits (name, game, how_to_obtain, purpose) VALUES ('Phazon Suit', 'Metroid Prime', 'Defeat Omega Pirate', 'Protects against Phazon, Use Phazons energy as a weapon');
INSERT INTO suits (name, game, how_to_obtain, purpose) VALUES ('Dark Suit', 'Metroid Prime 2: Echoes', 'Defeat Amorbis', 'Reduces damage taken per second from Dark Aethers atmosphere');
INSERT INTO suits (name, game, how_to_obtain, purpose) VALUES ('Light Suit', 'Metroid Prime 2: Echoes', 'From U-Mos in the Main Energy Controller', 'Impervious to Dark Aethers hazards and toxic water');
INSERT INTO suits (name, game, how_to_obtain, purpose) VALUES ('PED Suit', 'Metroid Prime 3: Corruption', 'After Phazon Corruption', 'Allows user to enter Hypermode');

--[beams]===========================================================================================================================================
INSERT INTO beams (name, how_to_obtain, purpose) VALUES ('Power beam', 'Starting Gear', 'Default Beam');
INSERT INTO beams (name, how_to_obtain, purpose) VALUES ('Charge beam', 'Starting Gear', 'Allows charge attacks');
INSERT INTO beams (name, game, how_to_obtain, purpose) VALUES ('Wave beam', 'Metroid Prime', 'Chapel of the Elders - Phendrana Drifts', 'Home in on locked-on enemies, charge devices');
INSERT INTO beams (name, game, how_to_obtain, purpose) VALUES ('Ice beam', 'Metroid Prime', 'Antechamber (Metroid Prime)',  'Freeze Enemies');
INSERT INTO beams (name, game, how_to_obtain, purpose) VALUES ('Dark beam', 'Metroid Prime 2: Echoes', 'Defeats Dark Samus', 'Increased damage to light creatures');
INSERT INTO beams (name, game, how_to_obtain, purpose) VALUES ('Light beam', 'Metroid Prime 2: Echoes', 'Dark Agon Wastes', 'Ignites enemies, Increased damage to dark creatures');
INSERT INTO beams (name, game, how_to_obtain, purpose) VALUES ('Annihilator beam', 'Metroid Prime 2: Echoes', 'Defeat Quadraxis.', 'Supercharges Light Crystals, Homing capabilities when uncharged');
INSERT INTO beams (name, game, how_to_obtain, purpose) VALUES ('Nova beam', 'Metroid Prime 3: Corruption', 'Pirate Homeworld', 'Can pass through Phazite');
INSERT INTO beams (name, game, how_to_obtain, purpose) VALUES ('Hyper Beam (Phazon) beam', 'Metroid Prime 3: Corruption', 'Destroy Leviathan', 'Fires a devastatingly powerful beam');

-- --[missiles]========================================================================================================================================
INSERT INTO missiles (name, how_to_obtain, purpose) VALUES ('Missiles', 'Chozo Ruins (Metroid Prime), Temple Grounds (Metroid Prime 2: Echoes), G.F.S. Olympus (Corruption)', 'Explosions');
INSERT INTO missiles (name, game, how_to_obtain, purpose) VALUES ('Seeker Missiles', 'Metroid Prime 2: Echoes', 'Temple Grounds - Hall of Honored Dead', 'Locks onto multiple enemies');
INSERT INTO missiles (name, game, how_to_obtain, purpose) VALUES ('Ice Missile', 'Metroid Prime 3: Corruption', 'Sector 5 (Metroid Prime 3: Corruption)', 'Freezes enemies');
INSERT INTO missiles (name, game, how_to_obtain, purpose) VALUES ('Hyper Missile', 'Metroid Prime 3: Corruption', 'Elysian Leviathan Core', 'Defeat Helios');

-- [charge]==========================================================================================================================================
INSERT INTO charge (name, how_to_obtain, purpose) VALUES ('Super Missile', 'Phendrana Drifts (Metroid Prime), Torvus Bog (Metroid Prime 2: Echoes)', 'Homing capabilities when locked on, 3 or 5 x Missile power');
INSERT INTO charge (name, game, how_to_obtain, purpose) VALUES ('Wavebuster', 'Metroid Prime', 'Complete pillar puzzle', 'Amplifies homing and electric properties of the Wave Beam');
INSERT INTO charge (name, game, how_to_obtain, purpose) VALUES ('Ice Spreader', 'Metroid Prime', 'Magmoor Caverns', 'Homes in on enemies, Freezes multiple enemies');
INSERT INTO charge (name, game, how_to_obtain, purpose) VALUES ('Flamethrower', 'Metroid Prime', 'Storage Depot A', 'Amplifies powerful Plasma Beam technology');
INSERT INTO charge (name, game, how_to_obtain, purpose) VALUES ('Darkburst', 'Metroid Prime 2: Echoes', 'Mining Station B', 'Limited effect against fast moving enemies');
INSERT INTO charge (name, game, how_to_obtain, purpose) VALUES ('Sunburst', 'Metroid Prime 2: Echoes', 'Temple Grounds', 'Long range, incinerates enemies');
INSERT INTO charge (name, game, how_to_obtain, purpose) VALUES ('Sonic Boom', 'Metroid Prime 2: Echoes', 'Dark Agon Wastes', 'Damages multiple enemies simultaneously');

-- --[visor]============================================================================================================================================
INSERT INTO visor (name, how_to_obtain, purpose) VALUES ('Combat Visor', 'Default visor', 'holds extensive HUD');
INSERT INTO visor (name, how_to_obtain, purpose) VALUES ('Scan Visor', 'Starting gear', 'Collects and records data');
INSERT INTO visor (name, game, how_to_obtain, purpose) VALUES ('Thermal Visor', 'Metroid Prime', 'Starting gear', 'Thermal targeting');
INSERT INTO visor (name, how_to_obtain, purpose) VALUES ('X-Ray Visor', 'Tallon Overworld - Life Grove (Metroid Prime), Pirate Homeworld - Command Vault (Corruption)', 'Allows Samus to see certain cloaked enemies, Allows Samus to see through Phazite, Pinpoints weaknesses on certain enemies');
INSERT INTO visor (name, game, how_to_obtain, purpose) VALUES ('Dark Visor', 'Metroid Prime 2: Echoes', 'Defeat Chykka', 'Highlights any enemy or special object in red');
INSERT INTO visor (name, game, how_to_obtain, purpose) VALUES ('Echo Visor', 'Metroid Prime 2: Echoes', 'Aerie of Sanctuary Fortress', 'Sonic Targeting');