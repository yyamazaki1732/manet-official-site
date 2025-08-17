/* eslint-disable */

export interface PostDetailsItem {
    post: PostDetails;
}

export interface PostDetails {
    errors:   any[];
    messages: any[];
    list:     List[];
    details: Details;
}

export interface Details {
    topics_id: number
    ymd: string
    contents_type: number
    subject: string
    topics_flg: number
    open_flg: number
    regular_flg: number
    inst_ymdhi: string
    update_ymdhi: string
    topics_group_id: number
    slug: string
    order_no: number
    col_sort: string
    group_nm: string
    group_description: string
    contents_type_cnt: number
    contents_type_nm: string
    contents_type_slug: string | null
    contents_type_parent_nm: string | null
    category_parent_id: number | null
    contents_type_ext_col_01: string
    contents_type_ext_col_02: string
    contents_type_ext_col_03: string
    contents_type_ext_col_04: string
    contents_type_ext_col_05: string
    contents_type_list: number[]
    meta_description: string
    content: string            
}