using UnityEngine;

public class EnemyVision : MonoBehaviour
{
    public Transform player;
    public float rangoVision = 15f;
    public float velocidad = 3f;
    public LayerMask capaJugador;

    void Update()
    {
        if (player == null) return;

        float distancia = Vector3.Distance(transform.position, player.position);
        Vector3 direccion = (player.position - transform.position).normalized;

        // Elevamos el Raycast para que no choque con el suelo
        Vector3 origen = transform.position + Vector3.up * 1f;

        if (distancia <= rangoVision)
        {
            if (Physics.Raycast(origen, direccion, out RaycastHit hit, rangoVision, capaJugador))
            {
                if (hit.collider.CompareTag("Player"))
                {
                    Debug.Log("¡Jugador detectado!");

                    // Mirar al jugador
                    transform.LookAt(player);

                    // Moverse hacia el jugador
                    transform.position += direccion * velocidad * Time.deltaTime;
                }
            }
        }
    }

    // Solo para depurar (ver el rayo en escena)
    void OnDrawGizmos()
    {
        if (player == null) return;

        Gizmos.color = Color.red;
        Vector3 origen = transform.position + Vector3.up * 1f;
        Gizmos.DrawLine(origen, player.position);
    }
}
