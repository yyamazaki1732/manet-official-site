/* eslint-disable */

export interface PostItem {
    post: Post;
}

export interface Post {
    errors:   any[];
    messages: any[];
    list:     List[];
    pageInfo: PageInfo;
}

export interface List {
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
    col_sort:                 string;
    group_nm:                 string;
    group_description:        string;
    contents_type_cnt:        number;
    contents_type_nm:         string;
    contents_type_slug:       string;
    contents_type_parent_nm:  null;
    category_parent_id:       null;
    contents_type_ext_col_01: string;
    contents_type_ext_col_02: string;
    contents_type_ext_col_03: string;
    contents_type_ext_col_04: string;
    contents_type_ext_col_05: string;
    contents_type_list:       number[];
    meta_description:         string;
    content:                  string;
}

export interface PageInfo {
    totalCnt:     number;
    perPage:      number;
    totalPageCnt: number;
    pageNo:       number;
    firstIndex:   number;
    lastIndex:    number;
    path:         string;
    param:        string;
    startPageNo:  number;
    endPageNo:    number;
}
