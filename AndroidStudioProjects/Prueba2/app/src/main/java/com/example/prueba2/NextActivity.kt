package com.example.prueba2

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.net.toUri
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.prueba2.databinding.ActivityNextBinding
import androidx.core.net.toUri


class NextActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val binding = ActivityNextBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val username = intent.getStringExtra("username")
        binding.twWelcome.text = "!Bienvenido, $username"

        binding.btnExplorer.setOnClickListener {
            var texto = binding.etEverything.text.toString()
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = "https://www.google.com/search?q=${texto}".toUri()
            startActivity(intent)
        }
        binding.btnPhone.setOnClickListener {
            var telefono = binding.etEverything.text.toString()
            val intent = Intent(Intent.ACTION_DIAL)
            intent.data = "tel:${telefono}".toUri()
            startActivity(intent)
        }
        binding.btnMessage.setOnClickListener {
            val smsIntent = Intent(Intent.ACTION_VIEW)
            smsIntent.data = Uri.parse("sms:")
            smsIntent.putExtra("sms_body", "Hola")
            startActivity(smsIntent)
        }
        binding.btnShareText.setOnClickListener {
            var texto = binding.etEverything.text.toString()
            val shareIntent = Intent(Intent.ACTION_SEND)
            startActivity(Intent.createChooser(shareIntent, "Compartir con"))
        }
    }

    override fun onStart() {
        super.onStart()
        Log.d("onStart(2)", " llamado")
    }

    override fun onResume() {
        super.onResume()
        Log.d("onResume(2) llamado", "¡La Activity es visible y activa!")
        getString(R.string.toast_actividad_b)
    }

    override fun onPause() {
        super.onPause()
        Log.d("onPause(2) llamado", "Otra Activity toma el foco")
    }

    override fun onStop() {
        super.onStop()
        Log.d("onStop(2) llamado", " La Activity ya no es visible")
    }

    override fun onRestart() {
        super.onDestroy()
        Log.d("onRestart(2) llamado ", "Volviendo de estar 'stopped")
    }
    override fun onDestroy() {
        super.onDestroy()
        Log.d("onDestroy(2) llamado", "La Activity está siendo destruida")
    }
}