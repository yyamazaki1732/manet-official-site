/* eslint-disable */

export interface CommonItem {
    common: Common;
}

export interface Common {
    topics_id:                number;
    ymd:                      Date;
    contents_type:            number;
    subject:                  string;
    topics_flg:               number;
    open_flg:                 number;
    regular_flg:              number;
    inst_ymdhi:               Date;
    update_ymdhi:             Date;
    topics_group_id:          number;
    slug:                     string;
    order_no:                 number;
    group_nm:                 string;
    group_description:        string;
    contents_type_cnt:        number;
    contents_type_nm:         string;
    contents_type_slug:       null;
    contents_type_parent_nm:  null;
    category_parent_id:       null;
    contents_type_ext_col_01: null;
    contents_type_ext_col_02: null;
    contents_type_ext_col_03: null;
    contents_type_ext_col_04: null;
    contents_type_ext_col_05: null;
    contents_type_list:       number[];
    ogp:                      Ogp;
}

export interface Ogp {
    url:     string;
    url_org: string;
    desc:    string;
    credit:  string;
}
