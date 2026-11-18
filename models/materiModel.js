
const { DataTypes } = require('sequelize');
const sequelize = require('../config/appConfig');

const Materi = sequelize.define('Materi', {
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },

    mata_kuliah: {
        type: DataTypes.STRING,
        allowNull: false
    },

    pertemuan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1],
                msg: 'Nilai pertemuan minimal adalah 1'
            }
        }
    },

    status: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: 'Belum dipelajari',
        validate: {
            isIn: [[
                'Belum dipelajari',
                'Sedang dipelajari',
                'Sudah Dipelajari'
            ]]
        }
    },

    file_dokumen: {
        type: DataTypes.STRING,
        allowNull: true
    },

    nama_file_asli: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    ringkasan: {
        type: DataTypes.TEXT,
        allowNull: true
    }

}, {
    tableName: 'materi',
    timestamps: true
});

module.exports = Materi;
