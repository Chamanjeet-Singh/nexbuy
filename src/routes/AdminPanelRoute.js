export const ADMIN_DASHBOARD = "/admin/dashboard"


// MEDIA ROUTES

export const ADMIN_MEDIA_SHOW = "/admin/media"
export const ADMIN_MEDIA_EDIT = (id) => id ? `/admin/media/edit/${id}` : ` `


// CATEGORY ROUTES

export const ADMIN_CATEGORY_ADD = "/admin/category/add"
export const ADMIN_CATEGORY_SHOW = "/admin/category"
export const ADMIN_CATEGORY_EDIT = (id) => id ? `/admin/category/edit/${id}` : ` `

//Trash Routes

export const ADMIN_TRASH = "/admin/trash"