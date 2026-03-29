package com.example.tipoexamenimc

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class FlujoDatosViewModel : ViewModel() {
    private var _peso = MutableStateFlow("")
    var peso: StateFlow<String> = _peso

    private var _altura = MutableStateFlow("")
    var altura: StateFlow<String> = _altura

    private var _sexo = MutableStateFlow("")
    var sexo: StateFlow<String> = _sexo

    private var _nombre = MutableStateFlow("")
    var nombre : StateFlow <String> = _nombre

    fun setPeso(valor: String) {
        _peso.value = valor
    }

    fun setAltura(valor: String) {
        _altura.value = valor
    }

    fun setSexo(valor:String) {
        _sexo.value = valor
    }

    fun setNombre (valor: String) {
        _nombre.value = valor
    }

}