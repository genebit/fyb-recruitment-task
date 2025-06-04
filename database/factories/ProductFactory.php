<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'          => $this->faker->randomElement([
                'Laptop',
                'Smartphone',
                'Tablet',
                'Headphones',
                'Smartwatch',
                'Camera',
                'Printer',
                'Monitor',
                'Keyboard',
                'Mouse',
                'Wireless Mouse',
                'Gaming Keyboard',
                'Bluetooth Speaker',
                'USB-C Hub',
                'LED Monitor',
                'Webcam 1080p',
                'Smartphone Case',
                'Laptop Stand',
                'Noise Cancelling Headphones',
                'Portable Charger',
                '4K Action Camera',
                'Smartwatch',
                'Wireless Earbuds',
                'Mechanical Keyboard',
                'Graphic Tablet',
                'External Hard Drive',
                'Fitness Tracker',
                'Mini Projector',
                'WiFi Range Extender',
                'Ergonomic Chair'
            ]),
            'description' => fake()->randomElement([
                'High-quality and reliable product for everyday use.',
                'Designed for performance and comfort during long hours.',
                'Perfect for work, gaming, or everyday entertainment.',
                'Ergonomic design reduces strain and increases efficiency.',
                'Compact, lightweight, and perfect for on-the-go needs.',
                'Seamlessly connects with most modern devices and platforms.',
                'Built with premium materials for long-lasting durability.',
                'Ideal for both home office and professional environments.',
                'Energy-efficient and engineered for low power consumption.',
                'Trusted by professionals across various industries.',
                'Includes easy-to-follow setup instructions and support.',
                'Delivers crystal-clear sound and rich audio experience.',
                'Features advanced technology to boost your productivity.',
                'Crafted with style and practicality in mind.',
                'Modern design that complements any workspace or setup.',
                'Offers fast charging and high-speed data transfer.',
                'Tested rigorously to meet quality and safety standards.',
                'Great gift idea for tech lovers and professionals alike.',
                'Multifunctional design supports a wide range of uses.',
                'Engineered for smooth performance and minimal noise.',
                'Compatible with Windows, macOS, Android, and iOS.',
                'Built-in safety features protect against overheating.',
                'Perfect addition to any desktop or workstation.',
                'Offers exceptional value for its price point.',
                'Minimalist design with a focus on user experience.',
                'Includes warranty and access to customer support.',
                'Delivers stable performance even under heavy use.',
                'A favorite among remote workers and digital nomads.',
                'Sleek design that fits in any bag or drawer.',
                'Ready to use out of the box – no installation needed.'
            ]),
            'quantity'      => $this->faker->numberBetween(1, 100),
            'price'         => $this->faker->randomFloat(2, 5, 1000),
            'updated_at'    => now(),
            'created_at'    => now(),
        ];
    }
}
