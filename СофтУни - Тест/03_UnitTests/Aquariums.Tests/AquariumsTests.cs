namespace Aquariums.Tests
{
    using NUnit.Framework;
    using System;

    public class AquariumsTests
    {
        private Aquarium aquarium;

        [SetUp]
        public void Setup()
        {
            this.aquarium = new Aquarium("aqua", 10);
        }

        // Testing Constructors
        [Test]
        public void TestConstructorAquarium()
        {
            Assert.Multiple(() =>
            {
                Assert.That(aquarium.Name, Is.EqualTo("aqua"));
                Assert.That(aquarium.Capacity, Is.EqualTo(10));
                Assert.That(aquarium.Count, Is.EqualTo(0));
            });
        }

        [Test]
        public void TestConstructorFish()
        {
            Fish fish = new Fish("kali");
            Assert.Multiple(() =>
            {
                Assert.That(fish.Name, Is.EqualTo("kali"));
                Assert.That(fish.Available, Is.True);
            });
        }

        // Testing Properties
        [Test]
        public void TestPropName()
        {
            Assert.Throws<ArgumentNullException>(() =>
            {
                Aquarium newAquarium = new Aquarium(null, 10);
            });
        }

        [Test]
        public void TestPropCapacity()
        {
            Assert.Throws<ArgumentException>(() =>
            {
                Aquarium newAquarium = new Aquarium("aqua", -10);
            });
        }

        // Testing Methods
        [Test]
        public void TestMethodAdd_Working()
        {
            Fish fish = new Fish("kali");
            aquarium.Add(fish);

            int expectedCount = 1;
            int actualCount = aquarium.Count;
            Assert.AreEqual(expectedCount, actualCount);
        }

        [Test]
        public void TestMethodAdd_Invalid()
        {
            for (int i = 1; i <= 10; i++)
            {
                aquarium.Add(new Fish("kali" + i));
            }

            Assert.Throws<InvalidOperationException>(() =>
            {
                aquarium.Add(new Fish("kali" + 11));
            });
        }

        [Test]
        public void TestMethodRemove_Working()
        {
            for (int i = 1; i <= 10; i++)
            {
                aquarium.Add(new Fish("kali" + i));
            }

            aquarium.RemoveFish("kali10");

            int expectedCount = 9;
            int actualCount = aquarium.Count;
            Assert.AreEqual(expectedCount, actualCount);
        }

        [Test]
        public void TestMethodRemove_Invalid()
        {
            for (int i = 1; i <= 10; i++)
            {
                aquarium.Add(new Fish("kali" + i));
            }

            Assert.Throws<InvalidOperationException>(() =>
            {
                aquarium.RemoveFish("cecospeco");
            });
        }

        [Test]
        public void TestMethodSellFish_Working()
        {
            for (int i = 1; i <= 10; i++)
            {
                aquarium.Add(new Fish("kali" + i));
            }

            string expectedFishName = "kali10";
            bool expectedFishAvailable = false;

            Fish actualFish = aquarium.SellFish("kali10");

            Assert.AreEqual(expectedFishName, actualFish.Name);
            Assert.AreEqual(expectedFishAvailable, actualFish.Available);
            Assert.AreEqual(10, aquarium.Count); // we are selling a fish, but we don't remove it.
        }

        [Test]
        public void TestMethodSellFish_Invalid()
        {
            for (int i = 1; i <= 10; i++)
            {
                aquarium.Add(new Fish("kali" + i));
            }

            Assert.Throws<InvalidOperationException>(() =>
            {
                aquarium.SellFish("johnny"); // fish does not exist
                });
        }

        [Test]
        public void TestMethodReport_Working()
        {
            for (int i = 1; i <= 10; i++)
            {
                aquarium.Add(new Fish("kali" + i));
            }

            string expectedReport = "Fish available at aqua: kali1, kali2, kali3, kali4, kali5, kali6, kali7, kali8, kali9, kali10";
            string actualReport = aquarium.Report();
            Assert.AreEqual(expectedReport, actualReport);
        }


    }
}
