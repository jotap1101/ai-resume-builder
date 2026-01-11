-- AlterTable
ALTER TABLE "resumes" ADD COLUMN     "skills" TEXT[] DEFAULT ARRAY[]::TEXT[];
