using UnityEngine;

[RequireComponent(typeof(CharacterController))]
public class PlayerController : MonoBehaviour
{
    [Header("Movimiento")]
    public float walkSpeed = 5f;
    public float runSpeed = 9f;
    public float crouchSpeed = 2.5f;
    public float jumpHeight = 1.5f;
    public float gravity = -9.81f;

    [Header("Agacharse")]
    public float standingHeight = 1.8f;
    public float crouchHeight = 1f;
    public float crouchTransitionSpeed = 5f;

    private CharacterController controller;
    private Vector3 velocity;
    private bool isGrounded;
    private float currentHeight;

    void Start()
    {
        controller = GetComponent<CharacterController>();
        currentHeight = standingHeight;
        controller.height = standingHeight;
    }

    void Update()
    {
        // Verificar si está en el suelo
        isGrounded = controller.isGrounded;
        if (isGrounded && velocity.y < 0)
            velocity.y = -2f; // pequeño valor para mantener contacto con el suelo

        // --- MOVIMIENTO ---
        float moveX = Input.GetAxis("Horizontal");
        float moveZ = Input.GetAxis("Vertical");

        Vector3 move = transform.right * moveX + transform.forward * moveZ;

        // --- VELOCIDAD SEGÚN ESTADO ---
        float speed = walkSpeed;
        if (Input.GetKey(KeyCode.LeftShift)) speed = runSpeed;
        if (Input.GetKey(KeyCode.LeftControl)) speed = crouchSpeed;

        controller.Move(move * speed * Time.deltaTime);

        // --- SALTO ---
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            velocity.y = Mathf.Sqrt(jumpHeight * -2f * gravity);
        }

        // --- GRAVEDAD ---
        velocity.y += gravity * Time.deltaTime;
        controller.Move(velocity * Time.deltaTime);

        // --- AGACHARSE ---
        float targetHeight = Input.GetKey(KeyCode.LeftControl) ? crouchHeight : standingHeight;
        currentHeight = Mathf.Lerp(currentHeight, targetHeight, Time.deltaTime * crouchTransitionSpeed);
        controller.height = currentHeight;
    }
}
