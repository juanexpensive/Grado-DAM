package com.example.tipoexamengastos

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class FlujoDatosViewModel : ViewModel() {
    private val _dinero = MutableStateFlow("")
    var dinero: StateFlow<String> = _dinero

    private var _personas = MutableStateFlow("")
    var personas: StateFlow<String> = _personas

    private var _nombres = MutableStateFlow("")
    var nombres: StateFlow<String> = _nombres

    fun setDinero(valor: String) {
        _dinero.value = valor
    }

    fun setPersonas(valor: String) {
        _personas.value = valor
    }

    fun setNombres(valor:String) {
        _nombres.value = valor
    }

}