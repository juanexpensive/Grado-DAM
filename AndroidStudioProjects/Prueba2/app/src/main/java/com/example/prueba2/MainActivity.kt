package com.example.prueba2
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import com.example.prueba2.databinding.ActivityMainBinding


    class MainActivity : AppCompatActivity() {

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            enableEdgeToEdge()

            Log.d("onCreate()", "creado")

            val binding = ActivityMainBinding.inflate(layoutInflater)
            setContentView(binding.root)
            Log.d("MainActivity", "onCreate")



            binding.btnLogin.setOnClickListener {
                var username = binding.etUsuario.text.toString()
                var password = binding.etContrasena.text.toString()

                if (username == "admin" && password == "1234"){

                    val intent = Intent(applicationContext, NextActivity::class.java)
                    intent.putExtra("username", username)
                    startActivity(intent)
                }   else {
                    Toast.makeText(this, "Usuario o contraseña incorrectos", Toast.LENGTH_SHORT).show()
                }

            }
            }
            override fun onStart() {
                super.onStart()
                Log.d("onStart(1)", " llamado")
            }

            override fun onResume() {
                super.onResume()
                Log.d("onResume(1) llamado", "¡La Activity es visible y activa!")
                getString(R.string.toast_actividad_b)
            }

            override fun onPause() {
                super.onPause()
                Log.d("onPause(1) llamado", "Otra Activity toma el foco")
            }

            override fun onStop() {
                super.onStop()
                Log.d("onStop(1) llamado", " La Activity ya no es visible")
            }

        override fun onRestart() {
            super.onDestroy()
            Log.d("onRestart(1) llamado ", "Volviendo de estar 'stopped")
        }
        override fun onDestroy() {
            super.onDestroy()
            Log.d("onDestroy(1) llamado", "La Activity está siendo destruida")
        }
        }

