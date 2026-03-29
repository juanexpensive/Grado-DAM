using UnityEngine;

public class Gun : MonoBehaviour
{
    public float damage = 25f;
    public float range = 50f;
    public Camera fpsCamera;
    public ParticleSystem muzzleFlash;
    public AudioSource shootSound;

    void Update()
    {
        if (Input.GetButtonDown("Fire1"))
        {
            Shoot();
        }
    }

    void Shoot()
    {
        if (shootSound != null)
            shootSound.Play();

        if (muzzleFlash != null)
            muzzleFlash.Play();

        Ray ray = fpsCamera.ViewportPointToRay(new Vector3(0.5f, 0.5f, 0)); // centro de la pantalla
        RaycastHit hit;

        if (Physics.Raycast(ray, out hit, range))
        {
            Debug.Log("Raycast hit: " + hit.transform.name);

            EnemyHealth enemy = hit.transform.GetComponent<EnemyHealth>();
            if (enemy != null)
            {
                enemy.TakeDamage(damage);
                Debug.Log("Enemy hit! Health reduced");
            }
        }
    }
}
