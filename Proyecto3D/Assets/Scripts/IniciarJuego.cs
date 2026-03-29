using UnityEngine;
using UnityEngine.SceneManagement;

public class IniciarJuego : MonoBehaviour
{
    public void CargarNivel1()
    {
        SceneManager.LoadScene("Nivel1");
    }
}