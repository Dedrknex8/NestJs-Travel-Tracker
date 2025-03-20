-- DropForeignKey
ALTER TABLE "Destination" DROP CONSTRAINT "Destination_userId_fkey";

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
