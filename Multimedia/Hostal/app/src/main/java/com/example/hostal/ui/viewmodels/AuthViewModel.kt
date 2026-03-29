import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hostal.database.Usuario
import com.example.hostal.database.UsuarioDao
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class AuthViewModel(
    private val usuarioDao: UsuarioDao
) : ViewModel() {

    private val _usuarioLogueado = MutableStateFlow<Usuario?>(null)
    val usuarioLogueado: StateFlow<Usuario?> = _usuarioLogueado

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    fun login(nombre: String, password: String) {
        viewModelScope.launch {
            val usuario = usuarioDao.login(nombre, password)
            if (usuario != null) {
                _usuarioLogueado.value = usuario
                _error.value = null
            } else {
                _error.value = "Usuario o contraseña incorrectos"
            }
        }
    }

    fun registro(nombre: String, password: String) {
        viewModelScope.launch {
            val existente = usuarioDao.existeUsuario(nombre)
            if (existente != null) {
                _error.value = "El usuario ya existe"
            } else {
                usuarioDao.insertarUsuario(
                    Usuario(nombre = nombre, password = password)
                )
                // Auto-login tras registro
                login(nombre, password)
            }
        }
    }

    fun logout() {
        _usuarioLogueado.value = null
    }
}
