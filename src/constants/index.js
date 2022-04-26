// Login Page
export const APP_INIT = 'APP_INIT'

// Login Page
export const HTTP_LOGIN_FETCHING = 'HTTP_LOGIN_FETCHING'
export const HTTP_LOGIN_SUCCESS = 'HTTP_LOGIN_SUCCESS'
export const HTTP_LOGIN_FAILED = 'HTTP_LOGIN_FAILED'
export const HTTP_LOGOUT = 'HTTP_LOGOUT'

// Register Page
export const HTTP_REGISTER_FETCHING = 'HTTP_REGISTER_FETCHING'
export const HTTP_REGISTER_SUCCESS = 'HTTP_REGISTER_SUCCESS'
export const HTTP_REGISTER_FAILED = 'HTTP_REGISTER_FAILED'

// Stock Page
export const HTTP_STOCK_FETCHING = 'HTTP_STOCK_FETCHING'
export const HTTP_STOCK_SUCCESS = 'HTTP_STOCK_SUCCESS'
export const HTTP_STOCK_FAILED = 'HTTP_STOCK_FAILED'

// Stock Edit Page
export const HTTP_STOCK_EDIT_FETCHING = 'HTTP_STOCK_EDIT_FETCHING'
export const HTTP_STOCK_EDIT_SUCCESS = 'HTTP_STOCK_EDIT_SUCCESS'
export const HTTP_STOCK_EDIT_FAILED = 'HTTP_STOCK_EDIT_FAILED'
export const HTTP_STOCK_EDIT_INITIALED = 'HTTP_STOCK_EDIT_INITIALED'

// Block Page
export const HTTP_BLOCK_FETCHING = 'HTTP_BLOCK_FETCHING'
export const HTTP_BLOCK_SUCCESS = 'HTTP_BLOCK_SUCCESS'
export const HTTP_BLOCK_FAILED = 'HTTP_BLOCK_FAILED'
export const HTTP_BLOCKCOUNT_SUCCESS = 'HTTP_BLOCKCOUNT_SUCCESS'

// Blockdata Page
export const HTTP_BLOCKDATA_FETCHING = 'HTTP_BLOCKDATA_FETCHING'
export const HTTP_BLOCKDATA_SUCCESS = 'HTTP_BLOCKDATA_SUCCESS'
export const HTTP_BLOCKDATA_FAILED = 'HTTP_BLOCKDATA_FAILED'

// Block system monitoring
export const HTTP_SYSTEM_FETCHING = 'HTTP_SYSTEM_FETCHING'
export const HTTP_SYSTEM_SUCCESS = 'HTTP_SYSTEM_SUCCESS'
export const HTTP_SYSTEM_FAILED = 'HTTP_SYSTEM_FAILED'

// Transaction Edit Page
export const HTTP_TRANSACTION_FETCHING = 'HTTP_TRANSACTION_FETCHING'
export const HTTP_TRANSACTION_SUCCESS = 'HTTP_TRANSACTION_SUCCESS'
export const HTTP_TRANSACTION_FAILED = 'HTTP_TRANSACTION_FAILED'

// Error Code
export const E_PICKER_CANCELLED = 'E_PICKER_CANCELLED'
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR'
export const E_PERMISSION_MISSING = 'E_PERMISSION_MISSING'
export const E_PICKER_NO_CAMERA_PERMISSION = 'E_PICKER_NO_CAMERA_PERMISSION'
export const E_USER_CANCELLED = 'E_USER_CANCELLED'
export const E_UNKNOWN = 'E_UNKNOWN'
export const E_DEVELOPER_ERROR = 'E_DEVELOPER_ERROR'
export const TIMEOUT_NETWORK = 'ECONNABORTED' // request service timeout
export const NOT_CONNECT_NETWORK = 'NOT_CONNECT_NETWORK'

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  'Cannot connect to server, Please try again.'
export const NETWORK_TIMEOUT_MESSAGE =
  'A network timeout has occurred, Please try again.'
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  'An error has occurred. The photo was unable to upload.'

export const apiUrl = 'http://localhost:3001/api/v2'
export const imageUrl = 'http://localhost:3001'

export const YES = 'YES'
export const NO = 'NO'
export const OK = 'ok'
export const NOK = 'nok'
export const LOGIN_STATUS = 'LOGIN_STATUS'
export const TOKEN = 'LogChainToken'

export const server = {
  LOGIN_URL: `user/login`,
  REGISTER_URL: `user/register`,
  VERIFY_URL: `user/verify`,
  BLOCK_URL: `blockchain/blocks`,
  AUTH_URL: `authen`,
  BC_URL: `blockchain`,
  SYSTEM_URL: `system`,
  MINE_URL: `blockchain/mine`,
  TRANSACTION_URL: `transaction`,
  LOGIN_PASSED: `yes`,
}
