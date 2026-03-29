using UnityEngine;

public class MouseLook : MonoBehaviour
{
    [Header("Sensibilidad")]
    public float mouseSensitivity = 100f;

    [Header("Referencia")]
    public Transform playerBody; // El transform del jugador (rotación horizontal)

    float xRotation = 0f; // Rotación vertical de la cámara

    void Start()
    {
        // Bloquea y oculta el cursor
        Cursor.lockState = CursorLockMode.Locked;
    }

    void Update()
    {
        // Obtener movimiento del mouse
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        // Rotación vertical de la cámara (arriba/abajo)
        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -80f, 80f); // Limitar rotación

        transform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);

        // Rotación horizontal del jugador (izquierda/derecha)
        playerBody.Rotate(Vector3.up * mouseX);
    }
}
