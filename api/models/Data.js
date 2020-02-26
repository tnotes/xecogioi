/**
 * Data.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    status:{
        type:'boolean',
        defaultsTo:false
    },
    code:{
        type:'string',
        required:true
    },
    loai_phuong_tien:{
        type:'string'
    },
    so_may_thuc_te:{
        type:'string'
    },
    chu_phuong_tien:{
        type:'string'
    },
    dia_chi_chu_phuong_tien:{
        type:'string'
    },
    nhan_hieu:{
        type:'string'
    },
    so_khung_thuc_te:{
        type:'string'
    },
    khoi_luong_ban_than:{
        type:'string'
    },
    so_nguoi_cho_phep_tro:{
        type:'string'
    },
    kinh_doanh_van_tai:{
        type:'string'
    },
    lap_dat_thiet_bi_GSHT:{
        type:'string'
    },
    cong_thuc_banh_xe:{
        type:'string'
    },
    kich_thuoc_bao:{
        type:'string'
    },
    chieu_dai_co_so:{
        type:'string'
    },
    khoi_luong_hang_hoa_chuyen_cho_cho_phep_TGGT:{
        type:'string'
    },
    khoi_luong_toan_bo_cho_phep_tham_gia_giao_thong:{
        type:'string'
    },
    khoi_luog_keo_theo_cho_phep:{
        type:'string'
    },
    phuong_tien_cai_tao:{
        type:'string'
    },
    vet_banh_xe:{
        type:'string'
    },
    kich_thuoc_thung_hang:{
        type:'string'
    },
    co_lop:{
        type:'string'
    },
    lan_cuoi_kiem_dinh_da_thuc_hien:{
        type:'json',
        defaultsTo:[]
    }

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

