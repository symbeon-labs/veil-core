// VEIL O.R.B. - Modern Minimalist Version
// Design: Split-Shell Ceramic & Titanium
// Export this as STL for 3D Printing

$fn = 150;

orb_radius = 40;
ring_width = 2; // O rasgo para o anel de luz central

module modern_body() {
    difference() {
        sphere(r = orb_radius);
        
        // Interior Hollow
        sphere(r = orb_radius - 3);
        
        // Massive Visor (LCD GC9A01 Slot)
        translate([orb_radius - 4, 0, 0])
        rotate([0, 90, 0])
        cylinder(h = 10, r = 35, center = true);
        
        // Equatorial Split
        cube([orb_radius*2.2, orb_radius*2.2, ring_width], center = true);
        
        // Base Port
        translate([0, 0, -orb_radius + 2])
        cylinder(h = 10, r = 25, center = true);
    }
}

// Render the 3D Shell
modern_body();
