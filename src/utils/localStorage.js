// Vehicle Maintenance & Operations Management System - LocalStorage Utilities

const KEYS = {
  VEHICLES: 'fleet_vehicles',
  DRIVERS: 'fleet_drivers',
  BOOKINGS: 'fleet_bookings',
  TRIPS: 'fleet_trips',
  FUEL_LOGS: 'fleet_fuelLogs',
  EXPENSES: 'fleet_expenses',
  MAINTENANCE: 'fleet_maintenance',
  DOCUMENTS: 'fleet_documents',
  MAINTENANCE_INDENTS: 'fleet_maintenanceIndents',
  DAILY_OPERATIONS: 'fleet_dailyOperations',
  HEALTH_CHECKS: 'fleet_healthChecks',
  INITIALIZED: 'fleet_initialized_v3'
};

// ============== DUMMY DATA ==============

const DUMMY_VEHICLES = [
  { id: 'VH001', number: 'MH12AB1234', truckType: '12_tyre', makeModel: 'Tata Prima 4928.S', yearOfPurchase: 2021, chassisNo: 'MAT449274LRD12345', engineNo: 'DV6CTED123456', capacity: 28, ownershipType: 'owned', loadedMileage: 4, emptyMileage: 6, status: 'running', assignedDriverId: 'DR001', currentOdometer: 145000, createdAt: '2021-03-15' },
  { id: 'VH002', number: 'MH14CD5678', truckType: 'trailer', makeModel: 'Ashok Leyland U4923', yearOfPurchase: 2020, chassisNo: 'MB1CDSA99LWA23456', engineNo: 'H6CTE987654', capacity: 35, ownershipType: 'owned', loadedMileage: 3.5, emptyMileage: 5, status: 'running', assignedDriverId: 'DR002', currentOdometer: 198000, createdAt: '2020-06-20' },
  { id: 'VH003', number: 'MH20EF9012', truckType: '10_tyre', makeModel: 'Eicher Pro 6025', yearOfPurchase: 2022, chassisNo: 'VEP602599MBD34567', engineNo: 'E495B654321', capacity: 16, ownershipType: 'owned', loadedMileage: 5, emptyMileage: 7, status: 'under_maintenance', assignedDriverId: null, currentOdometer: 87000, createdAt: '2022-01-10' },
  { id: 'VH004', number: 'MH04GH3456', truckType: '14_tyre', makeModel: 'BharatBenz 3523R', yearOfPurchase: 2021, chassisNo: 'WDB9634031L456789', engineNo: 'OM926LA789012', capacity: 31, ownershipType: 'owned', loadedMileage: 3.8, emptyMileage: 5.5, status: 'running', assignedDriverId: 'DR003', currentOdometer: 156000, createdAt: '2021-08-05' },
  { id: 'VH005', number: 'MH43IJ7890', truckType: '12_tyre', makeModel: 'Tata Signa 4825.TK', yearOfPurchase: 2023, chassisNo: 'MAT482574LRD56789', engineNo: 'DV6CTED567890', capacity: 25, ownershipType: 'owned', loadedMileage: 4.2, emptyMileage: 6.2, status: 'running', assignedDriverId: 'DR004', currentOdometer: 45000, createdAt: '2023-02-28' },
  { id: 'VH006', number: 'MH12KL2345', truckType: 'trailer', makeModel: 'Volvo FM 420', yearOfPurchase: 2019, chassisNo: 'YV2RT40A5LB789012', engineNo: 'D13K420234567', capacity: 40, ownershipType: 'owned', loadedMileage: 3.2, emptyMileage: 4.8, status: 'idle', assignedDriverId: null, currentOdometer: 312000, createdAt: '2019-11-12' },
  { id: 'VH007', number: 'MH14MN6789', truckType: '16_tyre', makeModel: 'Ashok Leyland 4225', yearOfPurchase: 2022, chassisNo: 'MB1CDSA22LWA89012', engineNo: 'H6CTEH890123', capacity: 37, ownershipType: 'owned', loadedMileage: 3.5, emptyMileage: 5.2, status: 'running', assignedDriverId: 'DR005', currentOdometer: 112000, createdAt: '2022-05-18' },
  { id: 'VH008', number: 'MH20OP1234', truckType: '10_tyre', makeModel: 'Eicher Pro 6031', yearOfPurchase: 2023, chassisNo: 'VEP603199MBD01234', engineNo: 'E495B012345', capacity: 18, ownershipType: 'owned', loadedMileage: 5.2, emptyMileage: 7.5, status: 'running', assignedDriverId: 'DR006', currentOdometer: 32000, createdAt: '2023-07-01' },
  { id: 'VH009', number: 'MH04QR5678', truckType: '12_tyre', makeModel: 'Tata Prima 4928.S', yearOfPurchase: 2020, chassisNo: 'MAT449220LRD23456', engineNo: 'DV6CTED234567', capacity: 28, ownershipType: 'owned', loadedMileage: 4, emptyMileage: 6, status: 'breakdown', assignedDriverId: null, currentOdometer: 234000, createdAt: '2020-04-22' },
  { id: 'VH010', number: 'MH43ST9012', truckType: '14_tyre', makeModel: 'BharatBenz 4228R', yearOfPurchase: 2021, chassisNo: 'WDB9634021L567890', engineNo: 'OM926LA890123', capacity: 32, ownershipType: 'owned', loadedMileage: 3.6, emptyMileage: 5.3, status: 'running', assignedDriverId: 'DR007', currentOdometer: 178000, createdAt: '2021-09-30' },
  { id: 'VH011', number: 'MH12UV3456', truckType: 'trailer', makeModel: 'Scania R500', yearOfPurchase: 2022, chassisNo: 'YS2R4X20005678901', engineNo: 'DC13166901234', capacity: 42, ownershipType: 'owned', loadedMileage: 3, emptyMileage: 4.5, status: 'running', assignedDriverId: 'DR008', currentOdometer: 89000, createdAt: '2022-12-15' },
  { id: 'VH012', number: 'MH14WX7890', truckType: '10_tyre', makeModel: 'Mahindra Blazo X35', yearOfPurchase: 2023, chassisNo: 'MAB354499MZD12345', engineNo: 'mPOWER07345678', capacity: 17, ownershipType: 'owned', loadedMileage: 5.5, emptyMileage: 8, status: 'running', assignedDriverId: 'DR009', currentOdometer: 28000, createdAt: '2023-04-10' },
  { id: 'VH013', number: 'MH20YZ1234', truckType: '12_tyre', makeModel: 'Ashok Leyland 3520', yearOfPurchase: 2021, chassisNo: 'MB1CDSA21LWA34567', engineNo: 'H6CTEH456789', capacity: 25, ownershipType: 'owned', loadedMileage: 4.3, emptyMileage: 6.5, status: 'running', assignedDriverId: 'DR010', currentOdometer: 167000, createdAt: '2021-06-25' },
  { id: 'VH014', number: 'MH04AB5678', truckType: '16_tyre', makeModel: 'Tata Signa 5530.S', yearOfPurchase: 2022, chassisNo: 'MAT553074LRD45678', engineNo: 'DV6CTED678901', capacity: 40, ownershipType: 'owned', loadedMileage: 3.4, emptyMileage: 5, status: 'under_maintenance', assignedDriverId: null, currentOdometer: 98000, createdAt: '2022-08-20' }
];

const DUMMY_DRIVERS = [
  { id: 'DR001', name: 'Rajesh Kumar', phone: '9876543210', licenseNumber: 'MH1220210012345', licenseExpiry: '2028-05-15', aadharNumber: '234567891234', emergencyContact: '9898989898', address: 'Pune, Maharashtra', status: 'on_duty', createdAt: '2021-01-10' },
  { id: 'DR002', name: 'Suresh Patil', phone: '9876543211', licenseNumber: 'MH1420200054321', licenseExpiry: '2027-08-20', aadharNumber: '345678912345', emergencyContact: '9797979797', address: 'Mumbai, Maharashtra', status: 'on_duty', createdAt: '2020-06-15' },
  { id: 'DR003', name: 'Amit Singh', phone: '9876543212', licenseNumber: 'MH2020190098765', licenseExpiry: '2026-12-10', aadharNumber: '456789123456', emergencyContact: '9696969696', address: 'Nagpur, Maharashtra', status: 'on_duty', createdAt: '2019-02-01' },
  { id: 'DR004', name: 'Vikram Rao', phone: '9876543213', licenseNumber: 'MH0420180011111', licenseExpiry: '2027-03-25', aadharNumber: '567891234567', emergencyContact: '9595959595', address: 'Nashik, Maharashtra', status: 'on_duty', createdAt: '2018-02-20' },
  { id: 'DR005', name: 'Mohan Sharma', phone: '9876543214', licenseNumber: 'MH4320170022222', licenseExpiry: '2026-06-30', aadharNumber: '678912345678', emergencyContact: '9494949494', address: 'Aurangabad, Maharashtra', status: 'on_duty', createdAt: '2017-03-05' },
  { id: 'DR006', name: 'Prakash Jadhav', phone: '9876543215', licenseNumber: 'MH1220220033333', licenseExpiry: '2029-01-15', aadharNumber: '789123456789', emergencyContact: '9393939393', address: 'Kolhapur, Maharashtra', status: 'on_duty', createdAt: '2022-07-12' },
  { id: 'DR007', name: 'Ramesh Deshmukh', phone: '9876543216', licenseNumber: 'MH1420210044444', licenseExpiry: '2028-09-20', aadharNumber: '891234567890', emergencyContact: '9292929292', address: 'Solapur, Maharashtra', status: 'on_duty', createdAt: '2021-04-18' },
  { id: 'DR008', name: 'Ganesh Pawar', phone: '9876543217', licenseNumber: 'MH2020200055555', licenseExpiry: '2027-04-10', aadharNumber: '912345678901', emergencyContact: '9191919191', address: 'Sangli, Maharashtra', status: 'on_duty', createdAt: '2020-09-25' },
  { id: 'DR009', name: 'Santosh More', phone: '9876543218', licenseNumber: 'MH0420220066666', licenseExpiry: '2029-07-05', aadharNumber: '123456789012', emergencyContact: '9090909090', address: 'Ahmednagar, Maharashtra', status: 'on_duty', createdAt: '2022-11-08' },
  { id: 'DR010', name: 'Mahesh Kulkarni', phone: '9876543219', licenseNumber: 'MH4320210077777', licenseExpiry: '2028-11-30', aadharNumber: '234567890123', emergencyContact: '8989898989', address: 'Satara, Maharashtra', status: 'on_duty', createdAt: '2021-05-20' },
  { id: 'DR011', name: 'Deepak Gaikwad', phone: '9876543220', licenseNumber: 'MH1220230088888', licenseExpiry: '2030-02-28', aadharNumber: '345678901234', emergencyContact: '8888888888', address: 'Latur, Maharashtra', status: 'available', createdAt: '2023-01-15' },
  { id: 'DR012', name: 'Sanjay Shinde', phone: '9876543221', licenseNumber: 'MH1420190099999', licenseExpiry: '2026-10-15', aadharNumber: '456789012345', emergencyContact: '8787878787', address: 'Jalgaon, Maharashtra', status: 'available', createdAt: '2019-06-30' }
];

const DUMMY_DOCUMENTS = [
  { id: 'DOC001', vehicleId: 'VH001', docType: 'rc', docNumber: 'MH12/2021/1234567', expiryDate: null, uploadDate: '2021-03-15', fileData: null, fileName: 'RC_VH001.pdf' },
  { id: 'DOC002', vehicleId: 'VH001', docType: 'insurance', docNumber: 'INS/2024/987654', expiryDate: '2026-03-14', uploadDate: '2024-03-15', fileData: null, fileName: 'Insurance_VH001.pdf' },
  { id: 'DOC003', vehicleId: 'VH001', docType: 'pollution', docNumber: 'PUC/MH12/2025/123', expiryDate: '2026-02-15', uploadDate: '2025-02-16', fileData: null, fileName: 'PUC_VH001.pdf' },
  { id: 'DOC004', vehicleId: 'VH001', docType: 'fitness', docNumber: 'FIT/MH12/2024/456', expiryDate: '2026-03-01', uploadDate: '2024-03-02', fileData: null, fileName: 'Fitness_VH001.pdf' },
  { id: 'DOC005', vehicleId: 'VH001', docType: 'permit', docNumber: 'NP/MH/2023/789', expiryDate: '2028-06-30', uploadDate: '2023-07-01', fileData: null, fileName: 'Permit_VH001.pdf' },
  { id: 'DOC006', vehicleId: 'VH002', docType: 'rc', docNumber: 'MH14/2020/2345678', expiryDate: null, uploadDate: '2020-06-20', fileData: null, fileName: 'RC_VH002.pdf' },
  { id: 'DOC007', vehicleId: 'VH002', docType: 'insurance', docNumber: 'INS/2024/876543', expiryDate: '2026-06-19', uploadDate: '2024-06-20', fileData: null, fileName: 'Insurance_VH002.pdf' },
  { id: 'DOC008', vehicleId: 'VH003', docType: 'insurance', docNumber: 'INS/2025/765432', expiryDate: '2026-01-09', uploadDate: '2025-01-10', fileData: null, fileName: 'Insurance_VH003.pdf' }
];

const DUMMY_MAINTENANCE_INDENTS = [
  { id: 'MI001', vehicleId: 'VH003', issueDescription: 'Engine overheating issue, coolant leak suspected', garageName: 'Tata Authorized Service - Pune', expectedDowntime: 3, initialRemarks: 'Vehicle reported overheating during trip', estimatedCost: 25000, estimateItems: [{ item: 'Coolant Pump', cost: 12000 }, { item: 'Radiator Hose', cost: 3000 }, { item: 'Labor', cost: 10000 }], approvalStatus: 'approved', approvedBy: 'U001', approvedDate: '2026-01-25', status: 'active', dailyStatus: 'work_in_progress', expectedReadyDate: '2026-01-30', createdBy: 'U002', createdAt: '2026-01-24' },
  { id: 'MI002', vehicleId: 'VH014', issueDescription: 'Brake pad replacement and brake system inspection', garageName: 'BharatBenz Workshop - Mumbai', expectedDowntime: 2, initialRemarks: 'Scheduled maintenance - 100000 km service', estimatedCost: 45000, estimateItems: [{ item: 'Brake Pads (All wheels)', cost: 28000 }, { item: 'Brake Fluid', cost: 2000 }, { item: 'Labor', cost: 15000 }], approvalStatus: 'pending', approvedBy: null, approvedDate: null, status: 'pending_approval', dailyStatus: null, expectedReadyDate: null, createdBy: 'U002', createdAt: '2026-01-28' },
  { id: 'MI003', vehicleId: 'VH009', issueDescription: 'Complete engine failure - major overhaul required', garageName: 'Tata Authorized Service - Nagpur', expectedDowntime: 15, initialRemarks: 'Vehicle broke down on highway, towed to service center', estimatedCost: 350000, estimateItems: [{ item: 'Engine Overhaul Kit', cost: 180000 }, { item: 'Turbocharger', cost: 85000 }, { item: 'Labor', cost: 85000 }], approvalStatus: 'approved', approvedBy: 'U001', approvedDate: '2026-01-20', status: 'active', dailyStatus: 'waiting_for_parts', expectedReadyDate: '2026-02-10', createdBy: 'U002', createdAt: '2026-01-18' }
];

const DUMMY_DAILY_OPERATIONS = [
  { id: 'DO001', vehicleId: 'VH001', driverId: 'DR001', date: '2026-01-28', openingKM: 144800, closingKM: 145000, totalKM: 200, fuelLiters: 50, fuelCost: 5250, route: 'Pune - Mumbai - Pune', purpose: 'Rice delivery', remarks: 'Smooth trip, no issues', createdAt: '2026-01-28' },
  { id: 'DO002', vehicleId: 'VH002', driverId: 'DR002', date: '2026-01-28', openingKM: 197600, closingKM: 198000, totalKM: 400, fuelLiters: 115, fuelCost: 12075, route: 'Mumbai - Nashik - Aurangabad', purpose: 'Goods loading', remarks: 'Heavy traffic on highway', createdAt: '2026-01-28' },
  { id: 'DO003', vehicleId: 'VH004', driverId: 'DR003', date: '2026-01-28', openingKM: 155700, closingKM: 156000, totalKM: 300, fuelLiters: 80, fuelCost: 8400, route: 'Nagpur - Hyderabad', purpose: 'Container transport', remarks: '', createdAt: '2026-01-28' }
];

const DUMMY_HEALTH_CHECKS = [
  { id: 'HC001', vehicleId: 'VH001', checkDate: '2026-01-27', tyreCondition: 'good', brakeCondition: 'good', engineSound: 'good', suspension: 'good', bodyCondition: 'good', lightsIndicators: 'good', remarks: 'Vehicle in excellent condition', checkedBy: 'DR001', createdAt: '2026-01-27' },
  { id: 'HC002', vehicleId: 'VH002', checkDate: '2026-01-27', tyreCondition: 'average', brakeCondition: 'good', engineSound: 'good', suspension: 'average', bodyCondition: 'good', lightsIndicators: 'good', remarks: 'Front tyres showing wear, need replacement in 2 weeks', checkedBy: 'DR002', createdAt: '2026-01-27' }
];

const DUMMY_BOOKINGS = [
  { id: 'BK001', customerName: 'ABC Rice Mills', customerPhone: '9988776655', pickupLocation: 'Pune', deliveryLocation: 'Mumbai', goodsType: 'Rice Bags', weight: 25, quotedAmount: 35000, bookingDate: '2026-01-28', status: 'assigned', createdAt: '2026-01-28' },
  { id: 'BK002', customerName: 'XYZ Traders', customerPhone: '9988776656', pickupLocation: 'Nashik', deliveryLocation: 'Bangalore', goodsType: 'Textiles', weight: 18, quotedAmount: 65000, bookingDate: '2026-01-29', status: 'created', createdAt: '2026-01-29' }
];

const DUMMY_TRIPS = [
  { id: 'TR001', bookingId: 'BK001', vehicleId: 'VH001', driverId: 'DR001', startLocation: 'Pune', endLocation: 'Mumbai', startOdometer: 144800, endOdometer: 145000, distance: 200, startTime: '2026-01-28T06:00:00', endTime: '2026-01-28T12:00:00', status: 'completed', revenue: 35000, createdAt: '2026-01-28' }
];

const DUMMY_FUEL_LOGS = [
  { id: 'FL001', tripId: 'TR001', vehicleId: 'VH001', driverId: 'DR001', liters: 50, pricePerLiter: 105, totalCost: 5250, odometer: 144850, location: 'HP Petrol Pump, Lonavala', date: '2026-01-28', createdAt: '2026-01-28' }
];

const DUMMY_EXPENSES = [
  { id: 'EX001', vehicleId: 'VH001', driverId: 'DR001', tripId: 'TR001', expenseType: 'toll', amount: 850, date: '2026-01-28', notes: 'Mumbai-Pune Expressway toll', billImage: null, createdAt: '2026-01-28' },
  { id: 'EX002', vehicleId: 'VH001', driverId: 'DR001', tripId: 'TR001', expenseType: 'fooding', amount: 350, date: '2026-01-28', notes: 'Driver food allowance', billImage: null, createdAt: '2026-01-28' }
];

const DUMMY_MAINTENANCE = [
  { id: 'MT001', vehicleId: 'VH001', maintenanceType: 'oil_change', cost: 8500, odometer: 140000, nextServiceKM: 150000, date: '2026-01-10', notes: 'Regular oil change with filter', createdAt: '2026-01-10' },
  { id: 'MT002', vehicleId: 'VH002', maintenanceType: 'tire_replacement', cost: 85000, odometer: 180000, nextServiceKM: 220000, date: '2025-12-15', notes: 'All 6 rear tyres replaced', createdAt: '2025-12-15' }
];

// ============== INITIALIZATION ==============

export const initializeStorage = () => {
  const isInitialized = localStorage.getItem(KEYS.INITIALIZED);
  if (!isInitialized) {
    Object.values(KEYS).forEach(key => { if (key !== KEYS.INITIALIZED) localStorage.removeItem(key); });
    localStorage.setItem(KEYS.VEHICLES, JSON.stringify(DUMMY_VEHICLES));
    localStorage.setItem(KEYS.DRIVERS, JSON.stringify(DUMMY_DRIVERS));
    localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(DUMMY_DOCUMENTS));
    localStorage.setItem(KEYS.MAINTENANCE_INDENTS, JSON.stringify(DUMMY_MAINTENANCE_INDENTS));
    localStorage.setItem(KEYS.DAILY_OPERATIONS, JSON.stringify(DUMMY_DAILY_OPERATIONS));
    localStorage.setItem(KEYS.HEALTH_CHECKS, JSON.stringify(DUMMY_HEALTH_CHECKS));
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(DUMMY_BOOKINGS));
    localStorage.setItem(KEYS.TRIPS, JSON.stringify(DUMMY_TRIPS));
    localStorage.setItem(KEYS.FUEL_LOGS, JSON.stringify(DUMMY_FUEL_LOGS));
    localStorage.setItem(KEYS.EXPENSES, JSON.stringify(DUMMY_EXPENSES));
    localStorage.setItem(KEYS.MAINTENANCE, JSON.stringify(DUMMY_MAINTENANCE));
    localStorage.setItem(KEYS.INITIALIZED, 'true');
  }
};

// ============== GENERIC CRUD ==============
const getData = (key) => { const d = localStorage.getItem(key); return d ? JSON.parse(d) : []; };
const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const generateId = (prefix) => `${prefix}${Date.now()}`;

// ============== VEHICLES ==============
export const getVehicles = () => getData(KEYS.VEHICLES);
export const getVehicleById = (id) => getVehicles().find(v => v.id === id);
export const addVehicle = (vehicle) => { const vehicles = getVehicles(); const nv = { ...vehicle, id: generateId('VH'), createdAt: new Date().toISOString().split('T')[0] }; vehicles.push(nv); setData(KEYS.VEHICLES, vehicles); return nv; };
export const updateVehicle = (id, updates) => { const vehicles = getVehicles(); const i = vehicles.findIndex(v => v.id === id); if (i !== -1) { vehicles[i] = { ...vehicles[i], ...updates }; setData(KEYS.VEHICLES, vehicles); return vehicles[i]; } return null; };
export const deleteVehicle = (id) => { setData(KEYS.VEHICLES, getVehicles().filter(v => v.id !== id)); };

// ============== DRIVERS ==============
export const getDrivers = () => getData(KEYS.DRIVERS);
export const getDriverById = (id) => getDrivers().find(d => d.id === id);
export const addDriver = (driver) => { const drivers = getDrivers(); const nd = { ...driver, id: generateId('DR'), status: 'available', createdAt: new Date().toISOString().split('T')[0] }; drivers.push(nd); setData(KEYS.DRIVERS, drivers); return nd; };
export const updateDriver = (id, updates) => { const drivers = getDrivers(); const i = drivers.findIndex(d => d.id === id); if (i !== -1) { drivers[i] = { ...drivers[i], ...updates }; setData(KEYS.DRIVERS, drivers); return drivers[i]; } return null; };
export const deleteDriver = (id) => { setData(KEYS.DRIVERS, getDrivers().filter(d => d.id !== id)); };

// ============== DOCUMENTS ==============
export const getDocuments = () => getData(KEYS.DOCUMENTS);
export const getDocumentsByVehicle = (vehicleId) => getDocuments().filter(d => d.vehicleId === vehicleId);
export const addDocument = (doc) => { const docs = getDocuments(); const nd = { ...doc, id: generateId('DOC'), uploadDate: new Date().toISOString().split('T')[0] }; docs.push(nd); setData(KEYS.DOCUMENTS, docs); return nd; };
export const updateDocument = (id, updates) => { const docs = getDocuments(); const i = docs.findIndex(d => d.id === id); if (i !== -1) { docs[i] = { ...docs[i], ...updates }; setData(KEYS.DOCUMENTS, docs); return docs[i]; } return null; };
export const deleteDocument = (id) => { setData(KEYS.DOCUMENTS, getDocuments().filter(d => d.id !== id)); };

// ============== MAINTENANCE INDENTS ==============
export const getMaintenanceIndents = () => getData(KEYS.MAINTENANCE_INDENTS);
export const getIndentById = (id) => getMaintenanceIndents().find(i => i.id === id);
export const addMaintenanceIndent = (indent) => { const indents = getMaintenanceIndents(); const ni = { ...indent, id: generateId('MI'), approvalStatus: 'pending', status: 'pending_approval', createdAt: new Date().toISOString().split('T')[0] }; indents.push(ni); setData(KEYS.MAINTENANCE_INDENTS, indents); return ni; };
export const updateMaintenanceIndent = (id, updates) => { const indents = getMaintenanceIndents(); const i = indents.findIndex(ind => ind.id === id); if (i !== -1) { indents[i] = { ...indents[i], ...updates }; setData(KEYS.MAINTENANCE_INDENTS, indents); return indents[i]; } return null; };
export const approveIndent = (id, approvedBy) => updateMaintenanceIndent(id, { approvalStatus: 'approved', approvedBy, approvedDate: new Date().toISOString().split('T')[0], status: 'active' });
export const rejectIndent = (id, approvedBy, reason) => updateMaintenanceIndent(id, { approvalStatus: 'rejected', approvedBy, approvedDate: new Date().toISOString().split('T')[0], rejectionReason: reason, status: 'rejected' });

// ============== DAILY OPERATIONS ==============
export const getDailyOperations = () => getData(KEYS.DAILY_OPERATIONS);
export const getDailyOpsByVehicle = (vehicleId) => getDailyOperations().filter(d => d.vehicleId === vehicleId);
export const getDailyOpsByDate = (date) => getDailyOperations().filter(d => d.date === date);
export const addDailyOperation = (op) => { const ops = getDailyOperations(); const no = { ...op, id: generateId('DO'), totalKM: (op.closingKM || 0) - (op.openingKM || 0), createdAt: new Date().toISOString().split('T')[0] }; ops.push(no); setData(KEYS.DAILY_OPERATIONS, ops); return no; };
export const updateDailyOperation = (id, updates) => { const ops = getDailyOperations(); const i = ops.findIndex(o => o.id === id); if (i !== -1) { ops[i] = { ...ops[i], ...updates, totalKM: (updates.closingKM || ops[i].closingKM || 0) - (updates.openingKM || ops[i].openingKM || 0) }; setData(KEYS.DAILY_OPERATIONS, ops); return ops[i]; } return null; };

// ============== HEALTH CHECKS ==============
export const getHealthChecks = () => getData(KEYS.HEALTH_CHECKS);
export const getHealthChecksByVehicle = (vehicleId) => getHealthChecks().filter(h => h.vehicleId === vehicleId);
export const addHealthCheck = (check) => { const checks = getHealthChecks(); const nc = { ...check, id: generateId('HC'), createdAt: new Date().toISOString().split('T')[0] }; checks.push(nc); setData(KEYS.HEALTH_CHECKS, checks); return nc; };

// ============== BOOKINGS ==============
export const getBookings = () => getData(KEYS.BOOKINGS);
export const getBookingById = (id) => getBookings().find(b => b.id === id);
export const addBooking = (booking) => { const bookings = getBookings(); const nb = { ...booking, id: generateId('BK'), status: 'created', bookingDate: new Date().toISOString().split('T')[0], createdAt: new Date().toISOString().split('T')[0] }; bookings.push(nb); setData(KEYS.BOOKINGS, bookings); return nb; };
export const updateBooking = (id, updates) => { const bookings = getBookings(); const i = bookings.findIndex(b => b.id === id); if (i !== -1) { bookings[i] = { ...bookings[i], ...updates }; setData(KEYS.BOOKINGS, bookings); return bookings[i]; } return null; };
export const deleteBooking = (id) => { setData(KEYS.BOOKINGS, getBookings().filter(b => b.id !== id)); };

// ============== TRIPS ==============
export const getTrips = () => getData(KEYS.TRIPS);
export const getTripById = (id) => getTrips().find(t => t.id === id);
export const addTrip = (trip) => { const trips = getTrips(); const nt = { ...trip, id: generateId('TR'), status: 'scheduled', createdAt: new Date().toISOString().split('T')[0] }; trips.push(nt); setData(KEYS.TRIPS, trips); updateBooking(trip.bookingId, { status: 'assigned' }); updateVehicle(trip.vehicleId, { status: 'running' }); updateDriver(trip.driverId, { status: 'on_duty' }); return nt; };
export const updateTrip = (id, updates) => { const trips = getTrips(); const i = trips.findIndex(t => t.id === id); if (i !== -1) { trips[i] = { ...trips[i], ...updates }; setData(KEYS.TRIPS, trips); return trips[i]; } return null; };
export const deleteTrip = (id) => { setData(KEYS.TRIPS, getTrips().filter(t => t.id !== id)); };
export const startTrip = (id) => { return updateTrip(id, { status: 'in_progress', startTime: new Date().toISOString() }); };
export const endTrip = (id, endData) => {
  const trip = updateTrip(id, { status: 'completed', endTime: new Date().toISOString(), ...endData });
  if (trip) { updateVehicle(trip.vehicleId, { status: 'idle' }); updateDriver(trip.driverId, { status: 'available' }); updateBooking(trip.bookingId, { status: 'completed' }); }
  return trip;
};
export const calculateTripCost = (tripId) => {
  const trip = getTripById(tripId);
  if (!trip) return { fuelCost: 0, expenses: 0, total: 0 };
  const fuelCost = getFuelLogs().filter(f => f.tripId === tripId).reduce((sum, f) => sum + (f.totalCost || 0), 0);
  const expenses = getExpenses().filter(e => e.tripId === tripId).reduce((sum, e) => sum + (e.amount || 0), 0);
  return { fuelCost, expenses, total: fuelCost + expenses, revenue: trip.revenue || 0, profit: (trip.revenue || 0) - fuelCost - expenses };
};

// ============== FUEL LOGS ==============
export const getFuelLogs = () => getData(KEYS.FUEL_LOGS);
export const getFuelLogsByVehicle = (vehicleId) => getFuelLogs().filter(f => f.vehicleId === vehicleId);
export const addFuelLog = (log) => { const logs = getFuelLogs(); const nl = { ...log, id: generateId('FL'), totalCost: Number(log.liters) * Number(log.pricePerLiter), date: log.date || new Date().toISOString().split('T')[0], createdAt: new Date().toISOString().split('T')[0] }; logs.push(nl); setData(KEYS.FUEL_LOGS, logs); return nl; };
export const deleteFuelLog = (id) => { setData(KEYS.FUEL_LOGS, getFuelLogs().filter(f => f.id !== id)); };

// ============== EXPENSES ==============
export const getExpenses = () => getData(KEYS.EXPENSES);
export const getExpensesByVehicle = (vehicleId) => getExpenses().filter(e => e.vehicleId === vehicleId);
export const getExpensesByDriver = (driverId) => getExpenses().filter(e => e.driverId === driverId);
export const addExpense = (expense) => { const expenses = getExpenses(); const ne = { ...expense, id: generateId('EX'), date: expense.date || new Date().toISOString().split('T')[0], createdAt: new Date().toISOString().split('T')[0] }; expenses.push(ne); setData(KEYS.EXPENSES, expenses); return ne; };
export const deleteExpense = (id) => { setData(KEYS.EXPENSES, getExpenses().filter(e => e.id !== id)); };

// ============== PROFIT CALCULATIONS ==============
export const getProfitByVehicle = (vehicleId) => {
  const calculateForVehicle = (vId) => {
    const vehicle = getVehicleById(vId);
    const trips = getTrips().filter(t => t.vehicleId === vId);
    const fuelCost = getFuelLogs().filter(f => f.vehicleId === vId).reduce((sum, f) => sum + (f.totalCost || 0), 0);
    const expensesCost = getExpenses().filter(e => e.vehicleId === vId).reduce((sum, e) => sum + (e.amount || 0), 0);
    const maintenanceCost = getMaintenance().filter(m => m.vehicleId === vId).reduce((sum, m) => sum + (m.cost || 0), 0);
    const revenue = trips.reduce((sum, t) => sum + (t.revenue || 0), 0);
    const totalCost = fuelCost + expensesCost + maintenanceCost;
    return {
      vehicleId: vId, vehicleNumber: vehicle?.number, vehicleType: vehicle?.truckType, ownershipType: vehicle?.ownershipType,
      totalRevenue: revenue, revenue, fuelCost, expenses: expensesCost, maintenanceCost, totalCost,
      totalProfit: revenue - totalCost, profit: revenue - totalCost, tripCount: trips.length
    };
  };
  if (vehicleId) return calculateForVehicle(vehicleId);
  return getVehicles().map(v => calculateForVehicle(v.id));
};
export const getMaintenance = () => getData(KEYS.MAINTENANCE);
export const getMaintenanceByVehicle = (vehicleId) => getMaintenance().filter(m => m.vehicleId === vehicleId);
export const addMaintenance = (maintenance) => { const records = getMaintenance(); const nr = { ...maintenance, id: generateId('MT'), date: new Date().toISOString().split('T')[0], createdAt: new Date().toISOString().split('T')[0] }; records.push(nr); setData(KEYS.MAINTENANCE, records); if (maintenance.setVehicleMaintenance) updateVehicle(maintenance.vehicleId, { status: 'under_maintenance' }); return nr; };
export const deleteMaintenance = (id) => { setData(KEYS.MAINTENANCE, getMaintenance().filter(m => m.id !== id)); };

// ============== DASHBOARD STATS ==============
export const getDashboardStats = () => {
  const vehicles = getVehicles();
  const drivers = getDrivers();
  const docs = getDocuments();
  const indents = getMaintenanceIndents();
  const dailyOps = getDailyOperations();
  const fuelLogs = getFuelLogs();
  const expenses = getExpenses();
  const maintenance = getMaintenance();

  const today = new Date();
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const thisMonth = today.toISOString().slice(0, 7);

  const expiringDocs = docs.filter(d => d.expiryDate && new Date(d.expiryDate) <= thirtyDaysFromNow && new Date(d.expiryDate) >= today);
  const expiredDocs = docs.filter(d => d.expiryDate && new Date(d.expiryDate) < today);

  const monthlyFuelCost = fuelLogs.filter(f => f.date?.startsWith(thisMonth)).reduce((sum, f) => sum + (f.totalCost || 0), 0);
  const monthlyMaintenanceCost = maintenance.filter(m => m.date?.startsWith(thisMonth)).reduce((sum, m) => sum + (m.cost || 0), 0);
  const monthlyExpenses = expenses.filter(e => e.date?.startsWith(thisMonth)).reduce((sum, e) => sum + (e.amount || 0), 0);
  const monthlyKM = dailyOps.filter(d => d.date?.startsWith(thisMonth)).reduce((sum, d) => sum + (d.totalKM || 0), 0);

  return {
    totalVehicles: vehicles.length,
    runningVehicles: vehicles.filter(v => v.status === 'running').length,
    underMaintenance: vehicles.filter(v => v.status === 'under_maintenance').length,
    idleVehicles: vehicles.filter(v => v.status === 'idle').length,
    breakdownVehicles: vehicles.filter(v => v.status === 'breakdown').length,
    totalDrivers: drivers.length,
    availableDrivers: drivers.filter(d => d.status === 'available').length,
    pendingIndents: indents.filter(i => i.approvalStatus === 'pending').length,
    activeIndents: indents.filter(i => i.status === 'active').length,
    expiringDocs, expiredDocs, monthlyFuelCost, monthlyMaintenanceCost, monthlyExpenses, monthlyKM
  };
};

export default { initializeStorage, getVehicles, getVehicleById, addVehicle, updateVehicle, deleteVehicle, getDrivers, getDriverById, addDriver, updateDriver, deleteDriver, getDocuments, getDocumentsByVehicle, addDocument, updateDocument, deleteDocument, getMaintenanceIndents, addMaintenanceIndent, updateMaintenanceIndent, approveIndent, rejectIndent, getDailyOperations, addDailyOperation, getHealthChecks, addHealthCheck, getBookings, addBooking, updateBooking, deleteBooking, getTrips, addTrip, updateTrip, getFuelLogs, addFuelLog, getExpenses, addExpense, getMaintenance, addMaintenance, getDashboardStats };
