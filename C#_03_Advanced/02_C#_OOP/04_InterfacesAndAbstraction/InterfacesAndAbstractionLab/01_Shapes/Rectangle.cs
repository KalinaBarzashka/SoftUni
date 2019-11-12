using System;

namespace Shapes
{
    public class Rectangle : IDrawable
    {
        private int width;
        private int height;

        public Rectangle(int width, int height)
        {
            this.Width = width;
            this.Height = height;
        }
        public int Width
        {
            get => this.width;
            private set
            {
                this.width = value;
            }
        }
        public int Height
        {
            get => this.height;
            private set
            {
                this.height = value;
            }
        }

        public void Draw()
        {
            DrawLine(this.Width, '*', '*');
            for (int i = 1; i < this.Height - 1; ++i)
            {
                DrawLine(this.Width, '*', ' ');
            }
            DrawLine(this.Width, '*', '*');

        }

        public void DrawLine(int width, char end, char middle)
        {
            Console.Write(end);
            for (int i = 1; i < width - 1; ++i)
            {
                Console.Write(middle);
            }

            Console.WriteLine(end);
        }
    }
}
