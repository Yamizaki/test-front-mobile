const Course = require('../models/Course');
const User = require('../models/User');

const seedCourses = [
  {
    title: 'Introducción a Blockchain',
    description: 'Aprende los fundamentos de la tecnología blockchain, cómo funciona y sus aplicaciones en el mundo real.',
    instructor: 'Carlos Martínez',
    duration: 40,
    level: 'Principiante',
    price: 99.99,
    topics: ['Bitcoin', 'Ethereum', 'Criptografía', 'Consenso', 'Minería'],
    enrolledStudents: 1250,
    rating: 4.7
  },
  {
    title: 'Smart Contracts con Solidity',
    description: 'Domina el desarrollo de contratos inteligentes en Ethereum usando Solidity desde cero hasta nivel avanzado.',
    instructor: 'Ana García',
    duration: 60,
    level: 'Intermedio',
    price: 149.99,
    topics: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js', 'Truffle', 'Hardhat'],
    enrolledStudents: 890,
    rating: 4.9
  },
  {
    title: 'DeFi: Finanzas Descentralizadas',
    description: 'Explora el ecosistema DeFi, aprende sobre protocolos de préstamos, exchanges descentralizados y yield farming.',
    instructor: 'Roberto Silva',
    duration: 35,
    level: 'Avanzado',
    price: 199.99,
    topics: ['DeFi', 'Uniswap', 'Aave', 'Compound', 'Yield Farming', 'Liquidity Pools'],
    enrolledStudents: 567,
    rating: 4.8
  },
  {
    title: 'NFTs: Creación y Comercialización',
    description: 'Aprende a crear, desplegar y comercializar NFTs. Incluye desarrollo técnico y estrategias de marketing.',
    instructor: 'Laura Fernández',
    duration: 25,
    level: 'Intermedio',
    price: 129.99,
    topics: ['NFTs', 'ERC-721', 'ERC-1155', 'IPFS', 'OpenSea', 'Metadata'],
    enrolledStudents: 2100,
    rating: 4.6
  },
  {
    title: 'Desarrollo de DApps Full Stack',
    description: 'Construye aplicaciones descentralizadas completas integrando smart contracts con interfaces web modernas.',
    instructor: 'Miguel Ángel Torres',
    duration: 80,
    level: 'Avanzado',
    price: 249.99,
    topics: ['React', 'Web3.js', 'Ethers.js', 'IPFS', 'The Graph', 'Metamask'],
    enrolledStudents: 445,
    rating: 4.9
  },
  {
    title: 'Seguridad en Blockchain',
    description: 'Aprende a identificar y prevenir vulnerabilidades en smart contracts y aplicaciones blockchain.',
    instructor: 'Patricia Ruiz',
    duration: 45,
    level: 'Avanzado',
    price: 179.99,
    topics: ['Auditoría', 'Reentrancy', 'Overflow', 'Access Control', 'Testing', 'Best Practices'],
    enrolledStudents: 320,
    rating: 4.8
  },
  {
    title: 'Tokenomics y Economía Cripto',
    description: 'Entiende los modelos económicos detrás de los tokens, ICOs, y cómo diseñar sistemas tokenizados sostenibles.',
    instructor: 'Diego Morales',
    duration: 30,
    level: 'Intermedio',
    price: 119.99,
    topics: ['Tokenomics', 'ICO', 'Token Design', 'Governance', 'Staking', 'Burning'],
    enrolledStudents: 678,
    rating: 4.5
  },
  {
    title: 'Blockchain para Empresas',
    description: 'Implementa soluciones blockchain empresariales con Hyperledger Fabric y casos de uso corporativos.',
    instructor: 'Sandra López',
    duration: 50,
    level: 'Intermedio',
    price: 189.99,
    topics: ['Hyperledger', 'Enterprise Blockchain', 'Supply Chain', 'Permissioned Networks'],
    enrolledStudents: 234,
    rating: 4.7
  }
];

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@blockchain.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Test User',
    email: 'user@blockchain.com',
    password: 'user123',
    role: 'user'
  }
];

const seedDatabase = async () => {
  try {
    // Limpiar datos existentes
    await Course.deleteMany();
    await User.deleteMany();

    console.log('🗑️  Datos anteriores eliminados');

    // Insertar usuarios
    await User.create(seedUsers);
    console.log('✅ Usuarios seed creados');

    // Insertar cursos
    await Course.create(seedCourses);
    console.log('✅ Cursos seed creados');

    console.log('🌱 Seed completado exitosamente');
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
  }
};

module.exports = seedDatabase;
