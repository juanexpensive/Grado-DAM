using UnityEngine;

public class SyncPlayerRotation : MonoBehaviour
{
    [SerializeField] private Transform cameraTransform;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        // Obtenemos la rotación actual de la cámara de Cinemachine
        float targetRotationY = cameraTransform.eulerAngles.y;

        // Aplicamos solo la rotación Y al cuerpo del jugador
        transform.rotation = Quaternion.Euler(0, targetRotationY, 0);
    }
}
