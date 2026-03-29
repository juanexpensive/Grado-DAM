using UnityEngine;
using UnityEngine.AI;
using System.Collections;

public class EnemyAI : MonoBehaviour
{
    [Header("Componentes")]
    public NavMeshAgent agent;
    public Animator animator;
    public Transform player;          // Transform del jugador
    public PlayerHealth playerHealth; // Script de vida del jugador

    [Header("IA")]
    public float detectionRange = 15f;
    public float attackRange = 2f;
    public float damage = 10f;
    public float attackCooldown = 1.5f;

    [Header("Sonidos")]
    public AudioSource walkSound;
    public AudioSource attackSound;

    private float lastAttackTime;
    private bool isDead = false;

    void Update()
    {
        if (isDead || player == null || agent == null)
            return;

        float distance = Vector3.Distance(transform.position, player.position);

        if (distance <= detectionRange)
        {
            // Seguir al jugador
            agent.SetDestination(player.position);

            // Animación caminar
            bool walking = agent.remainingDistance > agent.stoppingDistance;
            if (animator != null)
                animator.SetBool("isWalking", walking);

            // Sonido caminar
            if (walking && walkSound != null && !walkSound.isPlaying)
                walkSound.Play();
            else if (!walking && walkSound != null && walkSound.isPlaying)
                walkSound.Stop();

            // Ataque si está cerca y cooldown listo
            if (distance <= attackRange && Time.time - lastAttackTime > attackCooldown)
            {
                StartCoroutine(Attack());
            }
        }
        else
        {
            // Idle
            if (animator != null)
                animator.SetBool("isWalking", false);
            if (walkSound != null && walkSound.isPlaying)
                walkSound.Stop();
        }
    }

    IEnumerator Attack()
    {
        lastAttackTime = Time.time;
        agent.isStopped = true;

        // Trigger animación de ataque
        if (animator != null)
            animator.SetTrigger("Attack");

        // Sonido de ataque
        if (attackSound != null)
            attackSound.Play();

        // Esperar mitad de animación para aplicar daño
        yield return new WaitForSeconds(0.5f);

        // Aplicar daño si el jugador sigue cerca
        if (playerHealth != null && Vector3.Distance(transform.position, player.position) <= attackRange)
        {
            playerHealth.TakeDamage(damage);
            Debug.Log("Enemy hit player! Damage: " + damage);
        }

        // Esperar resto de animación
        yield return new WaitForSeconds(0.5f);

        agent.isStopped = false;
    }

    public void Die()
    {
        if (isDead) return;

        isDead = true;
        agent.isStopped = true;

        // Animación de muerte
        if (animator != null)
            animator.SetTrigger("Die");

        // Detener sonidos
        if (walkSound != null && walkSound.isPlaying)
            walkSound.Stop();

        // Destruir zombie después de 1.5 segundos
        Destroy(gameObject, 1.5f);
    }
}
