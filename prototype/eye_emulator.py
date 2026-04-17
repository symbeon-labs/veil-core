import pygame
import math
import time
import requests

# -- VEIL EYE EMULATOR (Software Prototype) --
# Simulates the GC9A01 Circular Display on your machine.
# It connects to the VEIL Python Orchestrator to react in real-time.

WIDTH, HEIGHT = 240, 240
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("VEIL O.R.B. Emulator")
clock = pygame.time.Clock()

# Colors
BLACK = (5, 5, 16)
CYAN = (0, 229, 255)
MAGENTA = (255, 0, 102)

# State
current_color = CYAN
current_shape = "oval"
expression_scale = 1.0

def get_veil_state():
    """Polls the local orchestrator for emotional state"""
    try:
        # Tenta pegar o estado do servidor que criamos nas etapas anteriores
        r = requests.get("http://localhost:8000/api/veil/status", timeout=0.1)
        if r.status_code == 200:
            return r.json()["data"]
    except:
        pass
    return None

def draw_eyes(surface, shape, color, scale):
    surface.fill(BLACK)
    
    # Mask Circular Display
    pygame.draw.circle(surface, (15, 15, 25), (120, 120), 120, 2)
    
    # Eye Dimensions
    base_w, base_h = 40, 60
    w = int(base_w * scale)
    h = int(base_h * scale)
    
    if shape == "oval":
        pygame.draw.ellipse(surface, color, (120 - 50 - w//2, 120 - h//2, w, h))
        pygame.draw.ellipse(surface, color, (120 + 50 - w//2, 120 - h//2, w, h))
    elif shape == "diamond" or shape == "angular":
        points_l = [(70, 120-h//2), (70+w, 120), (70, 120+h//2), (70-w, 120)]
        points_r = [(170, 120-h//2), (170+w, 120), (170, 120+h//2), (170-w, 120)]
        pygame.draw.polygon(surface, color, points_l)
        pygame.draw.polygon(surface, color, points_r)

running = True
last_poll = 0

print("🚀 VEIL Emulator Iniciado. Aguardando Orquestrador em localhost:8000...")

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Sync with Backend every 500ms
    if time.time() - last_poll > 0.5:
        state = get_veil_state()
        if state:
            current_shape = state.get("shape", "oval")
            color_hex = state.get("color", "#00E5FF").lstrip('#')
            current_color = tuple(int(color_hex[i:i+2], 16) for i in (0, 2, 4))
            expression_scale = 1.2 if state.get("arouse") == "high" else 1.0
        last_poll = time.time()

    # Blink logic
    pulse = (math.sin(time.time() * 3) + 1) / 2
    final_scale = expression_scale * (0.95 + pulse * 0.05)

    draw_eyes(screen, current_shape, current_color, final_scale)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
