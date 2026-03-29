using UnityEngine;

public class CursorInitializer : MonoBehaviour
{
    // Esto asegura que solo haya una instancia y que se ejecute primero
    private static bool initialized = false;

    void Awake()
    {
        if (!initialized)
        {
            initialized = true;
            DontDestroyOnLoad(gameObject); // Mantener entre escenas
            SetupCursor();
        }
        else
        {
            Destroy(gameObject); // Evita duplicados
        }
    }

    private void SetupCursor()
    {
        Cursor.visible = true;                        // Mostrar el cursor
        Cursor.lockState = CursorLockMode.None;       // Desbloquearlo
        Debug.Log("Cursor inicializado y visible");
    }
}
