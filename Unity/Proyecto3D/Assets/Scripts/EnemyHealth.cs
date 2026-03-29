using UnityEngine;

public class EnemyHealth : MonoBehaviour
{
    public float maxHealth = 50f;
    private float currentHealth;

    private EnemyAI enemyAI;
    private Animator animator;
    private bool isDead = false;

    void Start()
    {
        currentHealth = maxHealth;
        enemyAI = GetComponent<EnemyAI>();
        animator = GetComponent<Animator>();
    }

    public void TakeDamage(float amount)
    {
        if (isDead) return;

        currentHealth -= amount;

        if (currentHealth <= 0)
        {
            isDead = true;
            if (animator != null)
                animator.SetTrigger("Die");

            if (enemyAI != null)
                enemyAI.Die();
        }
        else
        {
            if (animator != null)
                animator.SetTrigger("Hit");
        }
    }
}
