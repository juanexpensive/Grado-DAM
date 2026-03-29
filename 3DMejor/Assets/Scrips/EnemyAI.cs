using UnityEngine;
using UnityEngine.AI;

public class EnemyAI : MonoBehaviour
{
    public Transform player;
    public NavMeshAgent agent;
    public float rangoVision = 15f;

    void Update()
    {
        if (player == null || agent == null) return;

        float distancia = Vector3.Distance(transform.position, player.position);

        if (distancia <= rangoVision)
        {
            // Mover hacia el jugador
            agent.SetDestination(player.position);
        }
        else
        {
            // Detener al salir del rango
            agent.ResetPath();
        }
    }
}
