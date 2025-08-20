<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250930015258 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE follow ADD id INT AUTO_INCREMENT NOT NULL, DROP PRIMARY KEY, ADD PRIMARY KEY (id)');
        $this->addSql('ALTER TABLE user ADD is_verified TINYINT(1) NOT NULL, ADD verification_token VARCHAR(255) DEFAULT NULL, ADD reset_password_token VARCHAR(255) DEFAULT NULL, ADD reset_password_expires_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE follow MODIFY id INT NOT NULL');
        $this->addSql('DROP INDEX `PRIMARY` ON follow');
        $this->addSql('ALTER TABLE follow DROP id');
        $this->addSql('ALTER TABLE follow ADD PRIMARY KEY (follower_id, followed_id)');
        $this->addSql('ALTER TABLE user DROP is_verified, DROP verification_token, DROP reset_password_token, DROP reset_password_expires_at');
    }
}
